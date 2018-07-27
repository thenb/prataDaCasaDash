'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:PremiosCtrl
 * @description
 * # PremiosCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('NotificacoesCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, $rootScope) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;
	
	$scope.notificacoes = [];	
	var promises = [];		
	
	function init() {		
					
	}	
	
	function getAllNotifications() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.user.login.id_login };
		Restangular.all('api/getAllNotifications').post(JSON.stringify(params)).then(function(notificacoes) {	
			console.log(notificacoes);
			$scope.notificacoes = notificacoes;
			deffered.resolve(notificacoes);
		});
		return deffered.promise;
	}	
	
	function excluirNotificacao(notificacao) {			
		var params = {  id_notificacao : notificacao.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirNotificacao').post(JSON.stringify(params)).then(function(noti) {		
			if (noti.error) {
				 deffered.reject(noti.error);
			}else{
				deffered.resolve(noti);
			}			
		});
		return deffered.promise;
	}
	
	function getAllUnreadNotifications() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.user.login.id_login };		
		Restangular.all('api/getAllUnreadNotifications').post(JSON.stringify(params)).then(function(qtd) {				
			deffered.resolve(qtd);
			console.log(qtd);
			console.log($rootScope.totalUnreadNotification);
			$rootScope.totalUnreadNotification = qtd[0].qtd;
		});
		return deffered.promise;
	}
	
	function visualizarNotificacao(notificacao) {			
		var params = {  notificacao : notificacao };	
		var deffered  = $q.defer();				
		Restangular.all('api/setReadNotification').post(JSON.stringify(params)).then(function(noti) {		
			if (noti.error) {
				 deffered.reject(noti.error);
			}else{
				getAllUnreadNotifications();
				deffered.resolve(noti);
			}			
		});
		return deffered.promise;
	}	
	
	function showNotification() {
        Notification.success('Notificação excluida com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao excluir a notificação!'});
    }
	
	$scope.excluir = function(notificacao) {
		console.log(notificacao);		
        ModalService.showModal({
			templateUrl: '/views/modal/exclusao.html',
			controller: 'ExclusaoCtrl'
		}).then(function(modal) {				
			modal.element.modal();
			modal.close.then(function(result) {
				if(result){
					var promises = [];	
					promises.push(excluirNotificacao(notificacao));	
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotification(retorno[0].msg);
						}else{
							showNotification();							
							var index = $scope.notificacoes.indexOf(notificacao);
							if (index > -1) {
								$scope.notificacoes.splice(index,1);
							}							
						}			
					});
				}				  
			});
		});
	};	
	
	$scope.view = function(notificacao) {
		var scope = $rootScope.$new();
		scope.params = {notificacao: notificacao};	
        ModalService.showModal({
			scope: scope,
			templateUrl: '/views/modal/notificacaoModal.html',
			controller: 'NotificacaoModalCtrl'
		}).then(function(modal) {				
			modal.element.modal();
			modal.close.then(function(result) {				
				console.log($scope.totalUnreadNotification);
				var promises = [];	
				promises.push(visualizarNotificacao(notificacao));					
				$q.all(promises).then(function(retorno) {																	
					var promisseNot = [];
					promisseNot.push(getAllNotifications());	
					$q.all(promises).then(						
					);								
				});								  
			});
		});
	};
	
	
	promises.push(getAllNotifications());		
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
