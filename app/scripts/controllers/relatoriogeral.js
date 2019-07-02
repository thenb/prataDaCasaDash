'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:RelatorioGeralCtrl
 * @description
 * # RelatorioGeralCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('RelatorioGeralCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, Excel, $timeout) {		
	
	
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	$scope.empresas = [];	
	$scope.campanhas = [];	
	$scope.especificadores = [];	
	$scope.campanhaSelecionada = [];	
	$scope.empresaSelecionada = [];	
	$scope.especificadorSelecionado = [];	
	$scope.data_inicio = [];	
	$scope.data_fim = [];
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

	function getAllEspec() {		
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspec').getList().then(function(users) {			
			users.map(function(user){			
				user.pontos= parseInt(user.pontos/100);								
			});				
			$scope.especificadores = users;
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
		var stringFilter = '';
		console.log($scope.campanhaSelecionada);
		if($scope.campanhaSelecionada){
			console.log($scope.campanhaSelecionada);
			stringFilter += ' and p.id_campanha =' + $scope.campanhaSelecionada.id;
		}
		if($scope.empresaSelecionada){
			console.log($scope.empresaSelecionada);
			stringFilter += ' and p.id_usuario =' + $scope.empresaSelecionada.id;
		}
		if($scope.especificadorSelecionado){
			console.log($scope.especificadorSelecionado);
			stringFilter += ' and p.id_especificador =' + $scope.especificadorSelecionado.id;
		}
		if($scope.data_inicio){
			var temp = moment($scope.data_inicio).format("YYYY-MM-DD hh:mm:ss")
			stringFilter += " and p.data_criacao >='" + temp +"'";
		}
		if($scope.data_fim){
			var temp = moment($scope.data_fim).format("YYYY-MM-DD hh:mm:ss")
			stringFilter += " and p.data_criacao <= '" + temp + "'";
		}
		console.log(stringFilter);

		
		var params = {  stringFilter : stringFilter};	
		var deffered  = $q.defer();		
		Restangular.all('api/getPontosFiltrado').post(JSON.stringify(params)).then(function(espec) {					
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
		$scope.especificadorSelecionado = null;
		$scope.data_inicio = null;
		$scope.data_fim = null;
		getAllEspecFiltrado();

	};

	$scope.filtrar = function(premio) {
		getAllEspecFiltrado();
	};


	promises.push(getAllCampanhas());	
	promises.push(getAllEmpre());	
	promises.push(getAllEspec());	

	$scope.data_inicio = null;
	$scope.data_fim = null
	$scope.empresaSelecionada = null;
	$scope.campanhaSelecionada = null;
	$scope.especificadorSelecionado = null;

	promises.push(getAllEspecFiltrado());	

	$q.all(promises).then(
		function() {
			init();		
		}	
	);
  });
