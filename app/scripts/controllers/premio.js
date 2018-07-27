'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadorCtrl
 * @description
 * # EspecificadorCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('PremioCtrl', function (Restangular, $scope, $http, $state, $q, Notification, moment) {
	
	var promisesInit = [];	
	$scope.premio1 = {};
	$scope.submited = false;	
	
	$scope.view = $state.params.view
	$scope.novo = $state.params.novo;
	if(typeof $state.params.novo === 'undefined'){
			$state.go('premios');
	}
		
	if($state.params.novo){
		$scope.operacao = 'Novo';		
	}else{
		if($state.params.aprovar){
			$scope.aprovar = true;
		}
		if($scope.view){
			$scope.operacao = 'Visualizar';			
		}else {
			$scope.operacao = 'Editar';			
		}		
		$scope.premio1 = $state.params.premio;					
	}
	
	function init() {		
	}
	
	function editarNomePremio() {			
		var deffered  = $q.defer();	
		var params = {  id_premio : $scope.premio1.id, nome : $scope.premio1.nome  };		
		Restangular.all('api/premioUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarDescricaoPremio() {			
		var deffered  = $q.defer();	
		var params = {  id_premio : $scope.premio1.id, descricao : $scope.premio1.descricao  };		
		Restangular.all('api/premioUpdateDescricao').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarPontosPremio() {			
		var deffered  = $q.defer();	
		var params = {  id_premio : $scope.premio1.id, pontos : $scope.premio1.pontos  };		
		Restangular.all('api/premioUpdatePontos').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	
	
	
	function salvarPremio() {			
		var deffered  = $q.defer();				
		console.log($scope.premio1);
		var params = {  premio : $scope.premio1 };	
		Restangular.all('api/savePremio').post(JSON.stringify(params)).then(function(premio) {					
			if (premio.error) {
				 deffered.reject(premio.error);
			}else{
				deffered.resolve(premio);
			}			
		});
		return deffered.promise;
	}
	
	function showNotification() {
        Notification.success('Prêmio cadastrado com sucesso!');
    }
	
	function showNotificationEditar() {
        Notification.success('Prêmio editado com sucesso!');
    }
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao cadastrar o prêmio!'});
    }
	
	function showErrorNotificationEditar(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao editar o prêmio!'});
    }
	
	
	
	
	$scope.salvar = function (formPremio) {			
		var promises = [];	
		$scope.submited = true;
		//Novo
		if($state.params.novo){		
			if(!formPremio.$invalid){	
				promises.push(salvarPremio());	
				$q.all(promises).then(function(retorno) {
					if(retorno[0].type===1){
						showErrorNotification(retorno[0].msg);
					}else{
						showNotification();		
						$state.go('premios');							
					}			
				});
			}				
		//Edicao
		}else{
			if(!formPremio.$invalid){	
				if(formPremio.nome.$dirty){
					promises.push(editarNomePremio());	
				}				
				if(formPremio.descricao.$dirty){
					promises.push(editarDescricaoPremio());	
				}				
				if(formPremio.pontos.$dirty){
					promises.push(editarPontosPremio());	
				}	
				
				$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotificationEditar(retorno[0].msg);
						}else{
							showNotificationEditar();		
							$state.go('premios');							
						}		
				});			
			}		
		}
	};
	
	$scope.cancelar = function () {			
		$state.go('premios');			
	};	
	
	$q.all(promisesInit).then(function(prom) {
			console.log(prom);
			init();		
		}	
	);
	
	
  });
