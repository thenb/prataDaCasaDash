'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('VisualizarPontuacao',  function ($scope, close, $q, Restangular) {	
	
	var promises = [];	
	$scope.espec_id = $scope.params.espec_id;	
	console.log($scope.espec_id );
	$scope.pontuacao = [];
	
	$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
	};
	
	function init() {			
						
	}
	
	function getAllPointsByEspecId() {			
		var params = {  espec_id : $scope.espec_id };	
		var deffered  = $q.defer();				
		Restangular.all('api/getAllPointsByEspecId').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				console.log(espec);
				espec.map(function(item){
					item.pontos = parseInt(item.pontos/100);
					if(item.data_criacao){
						item.data_criacao = moment(item.data_criacao).format('DD-MM-YYYY')
					}				
				});				
				$scope.pontuacao=espec;
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}
	
	
	promises.push(getAllPointsByEspecId());
	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
