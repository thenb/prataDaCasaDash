'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:AprovarespecificadorCtrl
 * @description
 * # AprovarespecificadorCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('AprovarespecificadorCtrl', function (Restangular, $scope, $filter, NgTableParams, $q, ModalService,$state,Notification) {
    
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.especificadores = [];	
	var promises = [];	
	
	
	
	function init() {			
			console.log('especificadores');
			console.log($scope.especificadores)	;			
	}	
	
	function getAllEspec() {
			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspecBlock').getList().then(function(users) {
			$scope.especificadores = users;
			$scope.especificadores.map(function(user) {			  
			  user.data_criacao = moment(user.data_criacao).zone(-3).format("DD-MM-YYYY");			 
			});
			
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	function aprovarExpec(especificador) {			
		var params = {  id_especificador : especificador.id , id_login: especificador.id_login};	
		var deffered  = $q.defer();				
		Restangular.all('api/aprovarEspec').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}
	
	function sendMailAprovado(especificador) {		
		var deffered  = $q.defer();	
		var params = {  id_login : especificador.id_login};		
		Restangular.all('api/getLoginEspec').post(JSON.stringify(params)).then(function(login) {					
			var email = login.email;
			var params1 = {  destino : email, assunto: '(Prata da Casa) Cadastro Aprovado', msg : 'Bem-Vindo ao Prata da Casa!'};								
			Restangular.all('api/sendMail').post(JSON.stringify(params1)).then(function(email) {		
				if (email.error) {
					 deffered.reject(email.error);
				}else{
					deffered.resolve(email);
				}				
			});
		});
		return deffered.promise;
	}		
	
	function desaprovarExpec(especificador) {			
		var params = {  id_especificador : especificador.id, id_login: especificador.id_login};	
		var deffered  = $q.defer();				
		Restangular.all('api/desaprovarEspec').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}
	
	function sendMailDesaprovado(especificador) {		
		var deffered  = $q.defer();	
		var params = {  id_login : especificador.id_login};		
		Restangular.all('api/getLoginEspec').post(JSON.stringify(params)).then(function(login) {					
			var email = login.email;
			var params1 = {  destino : email, assunto: '(Prata da Casa) Cadastro Não foi Aprovado', msg : 'Seu cadastro não foi aceito, entre em contato com a equipe Prata da Casa!'};								
			Restangular.all('api/sendMail').post(JSON.stringify(params1)).then(function(email) {		
				if (email.error) {
					 deffered.reject(email.error);
				}else{
					deffered.resolve(email);
				}				
			});
		});
		return deffered.promise;
	}	
	
	function showNotification() {
        Notification.success('Especificador aprovado com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao aprovar o especificador!'});
    }
	
	function showNotificationDesaprovar() {
        Notification.success('Especificador desaprovado com sucesso!');
    }
	
	function showErrorNotificationDesaprovar(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao desaprovar o especificador!'});
    }

	$scope.editar = function (espec) {
		$state.go('especificador', {novo: false, espec: espec, aprovar: true });
	};	
	
	$scope.aprovar = function (espec) {
		ModalService.showModal({
				templateUrl: '/views/modal/aprovar.html',
				controller: 'AprovarCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(aprovarExpec(espec));	
					promises.push(sendMail(espec));	
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotification(retorno[0].msg);
						}else{
							showNotification();							
							var index = $scope.especificadores.indexOf(espec);
							if (index > -1) {
								$scope.especificadores.splice(index,1);
							}							
						}			
					});
				  }				  
				});
			  });
	};
	
	
	$scope.desaprovar = function (espec) {
		ModalService.showModal({
				templateUrl: '/views/modal/desaprovar.html',
				controller: 'DesaprovarCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(desaprovarExpec(espec));
					promises.push(sendMailDesaprovado(espec));	
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotificationDesaprovar(retorno[0].msg);
						}else{
							showNotificationDesaprovar();							
							var index = $scope.especificadores.indexOf(espec);
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
