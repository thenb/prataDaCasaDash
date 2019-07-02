'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:RelatorioRankingCtrl
 * @description
 * # RelatorioRankingCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
.controller('RelatorioRankingCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, Excel, $timeout) {		

	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	$scope.empresas = [];	
	$scope.campanhas = [];	
	$scope.empresaSelecionada = [];	
	$scope.campanhaSelecionada = [];	
	$scope.result = [];

	var promises = [];	

	$scope.exportToExcel=function(tableId){ // ex: '#my-table'
	var exportHref=Excel.tableToExcel(tableId,'Relatório Empresas');
	$timeout(function(){
		var a = document.createElement('a');
		a.href=exportHref;
		a.download = "Relatório_Empresas.xls";
		document.body.appendChild(a);
		a.click();
		a.remove();}
			//location.href=exportHref;}
			,100); // trigger download
	}

	function init() {	
		console.log($scope.empresas);
		console.log($scope.campanhas);			
	}		

	function getAllEmpre() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEmpresas').getList().then(function(users) {
			users.map(function(user){			
				user.pontosEmpresa= parseInt(user.pontosEmpresa/100);								
			});				
			$scope.empresas = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}

	function getAllCampanhas() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllCamp').getList().then(function(users) {						
			$scope.campanhas = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}

	function getAllEspecFiltrado() {
		var id_campanha = null;
		console.log($scope.campanhaSelecionada);
		if($scope.campanhaSelecionada){
			console.log($scope.campanhaSelecionada);
			id_campanha = $scope.campanhaSelecionada.id;
		}	
		
		var params = {  id_campanha : id_campanha};	
		var deffered  = $q.defer();		
		Restangular.all('api/rankingEspecificadores').post(JSON.stringify(params)).then(function(espec) {					
			if (espec.error) {				
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);	
				$scope.result = espec;
				$scope.result.map(function(user){			
					user.pontos= parseInt(user.pontos/100);	
					user.data_criacao = moment(user.data_criacao).format("DD-MM-YYYY");									
				});	
			}	
		});		
	}

	$scope.resetar = function(empresa) {		
		$scope.empresaSelecionada = null;
		$scope.campanhaSelecionada = null;
		promises.push(getAllEspecFiltrado());	
	};

	$scope.filtrar = function(premio) {
		promises.push(getAllEspecFiltrado());	
	};

	promises.push(getAllCampanhas());	
	//promises.push(getAllEmpre());	
	promises.push(getAllEspecFiltrado());	

	$q.all(promises).then(
		function() {
			init();		
		}	
	);

});
