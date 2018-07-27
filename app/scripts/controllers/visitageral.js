'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EmpresasCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('VisitageralCtrl',  function (Restangular, $scope, $filter, $q, ModalService, Notification, $rootScope) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	var promises = [];	
	$scope.especificadores = [];	
	$scope.empresas = [];
	
	
	
	function init() {		
						
	}		
	
	function getAllEspecAndLogin() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspecAndLogin').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	function getAllClienteAndLogin() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllClientes').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	function getAllEmpresas() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEmpresas').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}		
	
	function showNotification() {
        Notification.success('Visita Cadastrada com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao cadastrar visita!'});
    }	
	
	
	//functions on view
	$scope.changeTipos = function(tipoSelecionado) {	
		var promisesTipo = [];	
		if($scope.tipoSelecionado.id==2){
			promisesTipo.push(getAllClienteAndLogin());
		}
		if($scope.tipoSelecionado.id==3){
			promisesTipo.push(getAllEspecAndLogin());
		}		
		if($scope.tipoSelecionado.id==1){
			$scope.especificadores = [];
		}
		$q.all(promisesTipo).then(function() {			
		});		
	};	
		
	
	$scope.visualizar = function(user) {	
		console.log(user)	
        var scope = $rootScope.$new();
		scope.params = {id_login: user.id_login, nome : user.nome, tipo: $scope.tipoSelecionado.id};
		ModalService.showModal({
				scope: scope,
				templateUrl: '/views/modal/visualizarVisitas.html',
				controller: 'VisualizarVisitas'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {				  				  
				});
			  });
	};
	
	$scope.tipos = [
		{id: '1', name: 'Selecione'},
		{id: '2', name: 'Clientes'},
		{id: '3', name: 'Especificadores'}
		
	];
		
	$scope.tipoSelecionado= {id: '1', name: 'Selecione'} ;	
		

	
	
	
	
  });
