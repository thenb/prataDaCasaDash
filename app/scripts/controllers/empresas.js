'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EmpresasCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('EmpresasCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	$scope.empresas = [];	
	var promises = [];	
	
	
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
	
	function excluirEmpre(empresa) {			
		var params = {  id_empresa : empresa.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirEmpre').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}

	function desabilitarEmpre(empresa) {			
		var params = {  id_empresa : empresa.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/desativarEmpre').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}

	function ativarEmpre(empresa) {			
		var params = {  id_empresa : empresa.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/ativarEmpre').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}
	
	function getInfoEmpresa(empresa) {			
		var params = {  id_empresa : empresa.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/getInfoEmpresa').post(JSON.stringify(params)).then(function(emp) {		
			console.log(emp);
			if (emp.error) {
				 deffered.reject(emp.error);
			}else{
				$scope.id_login_exclusao = emp[0].id_login;
				deffered.resolve(emp);
			}
			
		});
		return deffered.promise;
	}
	
	
	function excluirLogin(empresa) {			
		console.log(empresa);
		var promisseExclusao = [];
		promisseExclusao.push(getInfoEmpresa(empresa));
		$q.all(promisseExclusao).then(
			function() {
				var params = {  id_login : $scope.id_login_exclusao };	
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
		);	
	}
	
	function showNotificationExcluir() {
        Notification.success('Empresa excluida com sucesso!');
    }
	
	function showErrorNotificationExcluir(erro) {
	   Notification.success('Erro ao excluir empresa!');
	   Notification.error({message: erro.code, title: 'Erro ao excluir a empresa!'});
    }	
	

	$scope.novo = function () {
		$state.go('empresa', {novo: true, edit: false});
	};
	
	$scope.editar = function (empresa) {
		$state.go('empresa', {novo: false, empre: empresa, edit: true });
	};
	
	$scope.view = function (empresa) {
		console.log(empresa);
		$state.go('empresa', {novo: false, empre: empresa, view: true, edit: false });
	};

	$scope.changeEmpreStatus = function (empresa) {
		console.log("Chega aqui?")
		var statusAtivo = !empresa.status_ativo;
		var promise = [];	
		//Deve ativar?
		if(statusAtivo){
			promise.push(ativarEmpre(empresa));	
		//Deve Desativar?
		}else{		
			promise.push(desabilitarEmpre(empresa));
		}		
		$q.all(promise).then(
			function() {
			getAllEmpre();	
			}	
		);
	};
	
	$scope.excluir = function(empresa) {
          ModalService.showModal({
				templateUrl: '/views/modal/exclusao.html',
				controller: 'ExclusaoCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(excluirEmpre(empresa));
					promises.push(excluirLogin(empresa));					
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotificationExcluir(retorno[0].msg);
						}else{
							showNotificationExcluir();							
							var index = $scope.empresas.indexOf(empresa);
							if (index > -1) {
								$scope.empresas.splice(index,1);
							}							
						}			
					});
				  }				  
				});
			  });
	};

	
	promises.push(getAllEmpre());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
