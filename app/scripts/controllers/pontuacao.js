'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EmpresasCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('PontuacaoCtrl',  function (Restangular, $scope, $filter, $q) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.campanhaAtual = '';
	$scope.pontuacoes = [];	
	$scope.campanhas = [];		
	$scope.pontuacaoAtual = [];
	var promises = [];	
	
	
	function init() {					
	}	
	
	
	function getAllPontByIdEspec() {			
		var deffered  = $q.defer();	
		 var params = {  id_especificador : $scope.user.especificador.id };		
		Restangular.all('api/getAllPontByIdEspec').post(JSON.stringify(params)).then(function(pont) {			
			var total =  0;
			pont.map(function(item){				
				total+= item.pontos;				
			});			
			deffered.resolve(total);
			$scope.pontuacaoAtual = parseInt(total/100);;
		});
		return deffered.promise;
	}		
	
	function getAllCamp() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllCamp').getList().then(function(camp) {
			$scope.campanhas = camp;
			deffered.resolve(camp);
		});
		return deffered.promise;
	}
	
	function getIdCampAtiva() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getIdCampAtiva').getList().then(function(camp) {
			console.log(camp);
			$scope.campanhaAtual = camp[0].id;
			deffered.resolve(camp);
		});
		return deffered.promise;
	}
	
	function getAllPointsCampanhaAtiva() {
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.user.especificador.id };		
		Restangular.all('api/getAllPointsCampanhaAtiva').post(JSON.stringify(params)).then(function(pont) {			
			pont.map(function(item){
				if(item.data_criacao){
					item.data_criacao = moment(item.data_criacao).format('DD-MM-YYYY')
				}	
			    item.pontos = parseInt(item.pontos/100);
			});			
			$scope.pontuacoes = pont;			
			deffered.resolve(pont);
		});
		return deffered.promise;
		
	}
	
	
	//functions on view
	$scope.changeCampPoints = function(campanhaAtual) {				
		console.log('rolou?')
		 var params = {  id_campanha : campanhaAtual, id_especificador:  $scope.user.especificador.id };		
		Restangular.all('api/getAllPontByCampId').post(JSON.stringify(params)).then(function(camp) {
			camp.map(function(item){
				if(item.data_criacao){
					item.data_criacao = moment(item.data_criacao).format('DD-MM-YYYY')
				}				
			});	
			$scope.pontuacoes = camp;	
			console.log($scope.pontuacoes);
		});
		
	};
	
	promises.push(getAllPointsCampanhaAtiva());
	promises.push(getIdCampAtiva());
	promises.push(getAllCamp());
	promises.push(getAllPontByIdEspec());
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
