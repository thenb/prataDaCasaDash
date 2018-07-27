'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('VisualizarVisitas',  function ($scope, close, $q, Restangular) {	
	
	var promises = [];	
	$scope.id_login = $scope.params.id_login;
	$scope.nomeEspec = $scope.params.nome;
	$scope.tipo = $scope.params.tipo;
	$scope.visitas = [];
	
	$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
	};
	
	function init() {		
		console.log($scope.visitas);						
	}
	
	function getAllVisitasLoginId() {			
		var params = {  id_login : $scope.id_login };	
		var deffered  = $q.defer();				
		Restangular.all('api/getAllVisitasLoginId').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{				
				espec.map(function(item){
					if(item.data){
						item.data = moment(item.data).format('DD-MM-YYYY')
					}				
				});
				$scope.visitas=espec;
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}
	
	function getAllVisitasClienteId() {			
		var params = {  id_login : $scope.id_login };	
		var deffered  = $q.defer();				
		Restangular.all('api/getAllVisitasClienteId').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				espec.map(function(item){
					if(item.data){
						item.data = moment(item.data).format('DD-MM-YYYY')
					}				
				});
				$scope.visitas=espec;
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}	
	
	function getAllVisitasEmpresaId() {			
		var params = {  id_login : $scope.id_login };	
		var deffered  = $q.defer();				
		Restangular.all('api/getAllVisitasEmpresaId').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				$scope.visitas=espec;				
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}
	
	console.log($scope.id_login);
	if($scope.tipo == 3 || $scope.tipo == 2){
		promises.push(getAllVisitasLoginId());
	}	
	if($scope.tipo == 4){
		promises.push(getAllVisitasEmpresaId())
	}	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
