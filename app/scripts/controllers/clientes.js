'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('ClientesCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, moment) {	
	
	
	$scope.sortType     = ['data_criacao']; // set the default sort type
	$scope.sortReverse  = true;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	console.log($scope.user);
	
	
	$scope.indicou = false;	
	$scope.clientes = [];	
	var promises = [];		
	
	function init() {	
					
	}	
	
	function getAllClientes() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllClientes').getList().then(function(users) {
			$scope.clientes = users;
			$scope.clientes.map(function(item){
				if($scope.user.login.id_tipo_login == 3 ){
					if(item.id_indicou == $scope.user.especificador.id){
						$scope.indicou = true;
					}								
				}		

				
				//item.data_criacao = moment(item.data_criacao).format("DD-MM-YYYY");			
			});	
			deffered.resolve(users);
		});
		return deffered.promise;
	}	
	
	function excluirCliente(cliente) {			
		var params = {  id_cliente : cliente.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirCliente').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}
	
	function excluirLogin(cliente) {			
		var params = {  id_login : cliente.id_login };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirLogin').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}
	
	function showNotification() {
        Notification.success('Cliente excluido com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao excluir o Cliente!'});
    }	

	$scope.novo = function () {
		$state.go('cliente', {novo: true, edit: false, view: false});
	};
	
	$scope.editar = function (cliente) {
		$state.go('cliente', {novo: false, edit: true, cliente: cliente, view: false });
	};	
	
	$scope.view = function (cliente) {
		console.log(cliente);
		$state.go('cliente', {novo: false, edit: false, cliente: cliente, view: true });
	};
	
	$scope.excluir = function(cliente) {
		console.log(cliente);		
          ModalService.showModal({
				templateUrl: '/views/modal/exclusao.html',
				controller: 'ExclusaoCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(excluirCliente(cliente));	
					promises.push(excluirLogin(cliente));
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotification(retorno[0].msg);
						}else{
							showNotification();							
							var index = $scope.clientes.indexOf(cliente);
							if (index > -1) {
								$scope.clientes.splice(index,1);
							}							
						}			
					});
				  }				  
				});
			  });
	};	
	
	
	promises.push(getAllClientes());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
