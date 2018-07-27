'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadorCtrl
 * @description
 * # EspecificadorCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('CampanhaCtrl', function (Restangular, $scope, $http, $state, $q, Notification, moment) {
	
	var promisesInit = [];	
	$scope.campanha1 = {};
	$scope.submited = false;	
	
	$scope.novo = $state.params.novo;
	if(typeof $state.params.novo === 'undefined'){
			$state.go('campanhas');
	}
		
	if($state.params.novo){
		$scope.operacao = 'Nova';		
	}else{
		$scope.operacao = 'Editar';				
		$scope.campanha1 = $state.params.campanha;	
		console.log($scope.campanha1);
		$scope.campanha1.data_inicio = new Date($scope.campanha1.data_inicio);
		$scope.campanha1.data_fim = new Date($scope.campanha1.data_fim);
		console.log($scope.campanha1);
	}
	
	function init() {		
	}
	
	function editarNomeCampanha() {			
		var deffered  = $q.defer();	
		var params = {  id_campanha : $scope.campanha1.id, nome : $scope.campanha1.nome  };		
		Restangular.all('api/campanhaUpdateNome').post(JSON.stringify(params)).then(function(camp) {					
			deffered.resolve(camp);			
		});
		return deffered.promise;		
	}
	
	function editarDataInicioCampanha() {	
		var deffered  = $q.defer();	
		$scope.campanha1.data_inicio = moment($scope.campanha1.data_inicio).format("YYYY-MM-DD");	
		var params = {  id_campanha : $scope.campanha1.id, data_inicio : $scope.campanha1.data_inicio  };		
		Restangular.all('api/campanhaUpdateDataInicio').post(JSON.stringify(params)).then(function(camp) {					
			deffered.resolve(camp);			
		});
		return deffered.promise;		
	}
	
	function editarDataFimCampanha() {			
		var deffered  = $q.defer();	
		$scope.campanha1.data_fim = moment($scope.campanha1.data_fim).format("YYYY-MM-DD");
		var params = {  id_campanha : $scope.campanha1.id, data_fim : $scope.campanha1.data_fim  };		
		Restangular.all('api/campanhaUpdateDataFim').post(JSON.stringify(params)).then(function(camp) {					
			deffered.resolve(camp);			
		});
		return deffered.promise;		
	}
	
	function editarRegulamentoCampanha() {			
		var deffered  = $q.defer();	
		var params = {  id_campanha : $scope.campanha1.id, regulamento : $scope.campanha1.regulamento  };		
		Restangular.all('api/campanhaUpdateRegulamento').post(JSON.stringify(params)).then(function(camp) {					
			deffered.resolve(camp);			
		});
		return deffered.promise;		
	}	
	
	function salvarCampa() {			
		var deffered  = $q.defer();
		var params = {  campanha : $scope.campanha1 };	
		Restangular.all('api/saveCampanha').post(JSON.stringify(params)).then(function(empre) {					
			if (empre.error) {
				 deffered.reject(empre.error);
			}else{
				deffered.resolve(empre);
			}			
		});
		return deffered.promise;
	}
	
	function showNotification() {
        Notification.success('Campanha cadastrada com sucesso!');
    }
	
	function showNotificationEditar() {
        Notification.success('Campanha Editada com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro, title: 'Erro ao cadastrar a campanha!'});
    }
	
	function showErrorNotificationEditar(erro) {
	   Notification.error({message: erro, title: 'Erro ao editar a campanha!'});
    }		
	
	$scope.salvar = function (formCampa) {			
		$scope.submited = true;
		$scope.dataInvalida = false;
		console.log(formCampa);
		
		if($scope.campanha1.data_fim>$scope.campanha1.data_inicio){		
		console.log('eh maior')
		var promises = [];	
		//Novo
		if($state.params.novo){				
				if(!formCampa.$invalid){	
					$scope.campanha1.data_inicio = moment($scope.campanha1.data_inicio).format("YYYY-MM-DD");	
					$scope.campanha1.data_fim = moment($scope.campanha1.data_fim).format("YYYY-MM-DD");	
					promises.push(salvarCampa());	
					$q.all(promises).then(function(retorno) {
						console.log(retorno);
						if(retorno.length>0){
							if(retorno[0].type===1){
								showErrorNotification(retorno[0].msg);
							}else{
								showNotification();		
								$state.go('campanhas');							
							}
							
						}									
					});
				}				
		//Edicao
		}else{
			
			if(!formCampa.$invalid){	
				if(formCampa.nome.$dirty){
					promises.push(editarNomeCampanha());	
				}
				
				if(formCampa.data_inicio.$dirty){
					console.log($scope.campanha1)
					promises.push(editarDataInicioCampanha());	
				}
				
				if(formCampa.data_fim.$dirty){
					promises.push(editarDataFimCampanha());	
				}
				
				if(formCampa.regulamento.$dirty){
					promises.push(editarRegulamentoCampanha());	
				}
							
				$q.all(promises).then(function(retorno) {
					console.log(retorno);
					if(retorno.length>0){
						if(retorno[0].type===1){
							showErrorNotificationEditar(retorno[0].msg);
						}else{
							showNotificationEditar();		
							$state.go('campanhas');							
						}
					}else{
						$state.go('campanhas');	
					}								
				});				
			}			
		}
		}else{
			console.log('eh menor')
			$scope.dataInvalida = true;
		}
	};
	
	$scope.cancelar = function () {	
		$state.go('campanhas');		
	};	
	
	
	
	$q.all(promisesInit).then(function(prom) {
			console.log(prom);
			init();		
		}	
	);
	
	
  });
  
