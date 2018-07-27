'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EmpresasCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('LoginCtrl',  function (Restangular, $scope, $filter, $q, $window, Notification) {	
	
	$scope.user = {};
	$scope.newUser = {};
	$scope.recoverUser = {};
	//functions on view
	
	function login(user) {			
		var params = {  user : user };	
		var deffered  = $q.defer();	
		Restangular.all('doLogin').post(JSON.stringify(params)).then(function(user) {			
			if (user.error) {
				 deffered.reject(user.error);
			}else{
				deffered.resolve(user);
				console.log(user)		;		
				//$window.sessionStorage.token = user.token;
				localStorage.setItem("token", user.token);
			}			
		});
		return deffered.promise;
	}

	function novoCadastro(user) {			
		var params = {  user : user };	
		var deffered  = $q.defer();	
		console.log(user)		
		Restangular.all('doLogin').post(JSON.stringify(params)).then(function(user) {		
			if (user.error) {
				 deffered.reject(user.error);
			}else{
				deffered.resolve(user);
			}			
		});
		return deffered.promise;
	}	
	
	function showNotification() {
        Notification.success('Login efetuado com sucesso!');
    }	
	
	function showErrorNotification(erro) {		
	   Notification.error({message: erro, title: 'Erro ao efetuar o login!'});
    }
	
	
	$scope.doLogin = function(user) {
		var promises = [];	
		promises.push(login(user));	
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type===1){
				showErrorNotification(retorno[0].msg);
			}else{	
				$window.location.href = 'template.html';						
			}			
		});
	};	
	
	$scope.cadastrar = function(user) {
		console.log(user);
		$window.location.href = 'index.html';	
		var promises = [];	
		promises.push(novoCadastro(user));	
		$q.all(promises).then(function(retorno) {
			console.log(retorno);
			if(retorno[0].type===1){
				showErrorNotification(retorno[0].msg);
			}else{
			$window.location.href = 'template.html?user='+retorno[0].id+'&token='+retorno[0].token;	
			showNotification();				
			}			
		});
	};
	
	$scope.recuperar = function(user) {
		console.log(user);
		$window.location.href = 'index.html';	
		//var promises = [];	
		//promises.push(novoCadastro(user));	
		//$q.all(promises).then(function(retorno) {
		//	console.log(retorno);
		//	if(retorno[0].type===1){
		//		showErrorNotification(retorno[0].msg);
		///	}else{
		//	$window.location.href = 'template.html?user='+retorno[0].id+'&token='+retorno[0].token;	
		//	showNotification();				
		//	}			
		//});
	};
	
	$scope.resetPassword = function() {
		$window.location.href = 'recover.html';	
	};
	
	
  });
