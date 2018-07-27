'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:PremiosCtrl
 * @description
 * # PremiosCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('PremiosCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;
	
	$scope.premios = [];	
	var promises = [];		
	
	function init() {		
					
	}	
	
	function getAllPremios() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllPremiosCampanhaAtiva').getList().then(function(premios) {
			console.log(premios);
			$scope.premios = premios;
			deffered.resolve(premios);
		});
		return deffered.promise;
	}
	
	function getCampanhaAtiva() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getDadosCampanhaAtiva').getList().then(function(campanha) {
			console.log(campanha);
			$scope.campanhaAtiva = campanha[0];
			deffered.resolve(campanha);
		});
		return deffered.promise;
	}
	
	function excluirPremio(premio) {			
		var params = {  id_premio : premio.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirPremio').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}
	
	function showNotification() {
        Notification.success('Prêmio excluido com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao excluir o premio!'});
    }
	

	$scope.novo = function () {
		$state.go('premio', {novo: true});
	};
	
	$scope.editar = function (premio) {
		$state.go('premio', {novo: false, premio: premio });
	};
	
	$scope.view = function (premio) {
		console.log(premio);
		$state.go('premio', {novo: false, premio: premio, view: true });
	};
	
	$scope.excluir = function(premio) {
		console.log(premio);		
          ModalService.showModal({
				templateUrl: '/views/modal/exclusao.html',
				controller: 'ExclusaoCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(excluirPremio(premio));	
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotification(retorno[0].msg);
						}else{
							showNotification();							
							var index = $scope.premios.indexOf(premio);
							if (index > -1) {
								$scope.premios.splice(index,1);
							}							
						}			
					});
				  }				  
				});
			  });
	};	
	
	
	promises.push(getAllPremios());	
	promises.push(getCampanhaAtiva());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
