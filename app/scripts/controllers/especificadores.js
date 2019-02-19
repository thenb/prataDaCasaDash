'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('EspecificadoresCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification) {	

	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	$scope.especificadores = [];	
	var promises = [];		
	
	

	function init() {		
			console.log('especificadores');
			console.log($scope.especificadores);
	}	
	

	function getAllEspec() {		
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspec').getList().then(function(users) {
			console.log(users);
			users.map(function(user){			
				user.pontos= parseInt(user.pontos/100);								
			});				
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	

	function excluirExpec(especificador) {		
		var params = {  id_especificador : especificador.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirEspec').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}
	
	function excluirLogin(especificador) {			
		var params = {  id_login : especificador.id_login };	
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
        Notification.success('Especificador excluido com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao excluir o especificador!'});
    }
	

	$scope.novo = function () {
		$state.go('especificador', {novo: true, edit: false});
	};
	
	$scope.editar = function (espec) {
		$state.go('especificador', {novo: false, espec: espec, edit: true });
	};
	
	$scope.view = function (espec) {
		console.log(espec);
		$state.go('especificador', {novo: false, espec: espec, view: true, edit: false });
	};
	
	$scope.excluir = function(especificador) {
		console.log(especificador);		
          ModalService.showModal({
				templateUrl: '/views/modal/exclusao.html',
				controller: 'ExclusaoCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(excluirExpec(especificador));	
					promises.push(excluirLogin(especificador));
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotification(retorno[0].msg);
						}else{
							showNotification();							
							var index = $scope.especificadores.indexOf(especificador);
							if (index > -1) {
								$scope.especificadores.splice(index,1);
							}							
						}			
					});
				  }				  
				});
			  });
	};	
	
	
	promises.push(getAllEspec());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
