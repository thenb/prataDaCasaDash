'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:PontuacaoCtrl
 * @description
 * # PontuacaoCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('TemplateCtrl', function ($scope, $q, Restangular, $window, ModalService, $rootScope, $state) {
    
	
	var promises = [];	
	$scope.user = {};	
	
	var decoded = jwt_decode(localStorage.getItem("token"));	
	$scope.user = decoded.user;
	$rootScope.user = decoded.user;
	
	function init() {			
		console.log($scope.user);		
	}

	function getUserById() {
		
		var deffered  = $q.defer();
		console.log(localStorage.getItem("token"));
		if(localStorage.getItem("token")!='null'){
			var decoded = jwt_decode(localStorage.getItem("token"));	
			
			var params = {  user : decoded.userId };
			Restangular.all('api/getUserById').post(JSON.stringify(params)).then(function(espec) {	
				console.log(espec);
				if (espec.error) {
					 deffered.reject(espec.error);
				}else{
					deffered.resolve(espec);
				}				
			});
		}else{
			$window.location.href = 'index.html';
			
		}		
		return deffered.promise;		
	}

	function getAllUnreadNotifications() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.user.login.id_login };		
		Restangular.all('api/getAllUnreadNotifications').post(JSON.stringify(params)).then(function(qtd) {				
			deffered.resolve(qtd);
			console.log(qtd);
			$rootScope.totalUnreadNotification = qtd[0].qtd;
		});
		return deffered.promise;
	}
	
	$scope.doLogout = function(user) {		
		ModalService.showModal({
			templateUrl: '/views/modal/logout.html',
			controller: 'AprovarCtrl'
		}).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
					if(result){
						$window.localStorage['token'] = null;
						$scope.user = null;
						//localStorage.setItem("token", {});
						$window.location.href = 'index.html';
					}				  
				});
			});
			
	};

	$scope.notificacoes = function() {	
		$state.go('notificacoes');	
	};	
	
	
	
	
	
	promises.push(getAllUnreadNotifications());
	
	$q.all(promises).then(function(user) {		
		init();		
	});
	
	
	
  });
