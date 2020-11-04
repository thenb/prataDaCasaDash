'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('VisualizarPontuacao',  function ($scope, close, $q, Restangular, Notification, ModalService) {	
	
	var promises = [];	
	$scope.espec_id = $scope.params.espec_id;	
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	console.log($scope.espec_id );
	console.log($scope.tipoUsuario);
	$scope.pontuacao = [];
	$scope.hasExcluded = false;
	
	$scope.close = function(result) {
		console.log($scope.hasExcluded);
 	close($scope.hasExcluded, 500); // close, but give 500ms for bootstrap to animate
	};
	
	function init() {			
						
	}
	
	function getAllPointsByEspecId() {			
		var params = {  espec_id : $scope.espec_id };	
		var deffered  = $q.defer();				
		Restangular.all('api/getAllPointsByEspecId').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				console.log(espec);
				espec.map(function(item){
					item.pontos = parseInt(item.pontos/100);
					if(item.data_criacao){
						item.data_criacao = moment(item.data_criacao).format('DD-MM-YYYY')
					}				
				});				
				$scope.pontuacao=espec;
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}	

	function excluirPontuacao(pontos) {	
		console.log(pontos);		
		var params = {  id_pontuacao : pontos.id };		
		var deffered  = $q.defer();				
		Restangular.all('api/excluirPontuacao').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}

	$scope.excluir = function(ponto) {
		ModalService.showModal({
			  templateUrl: '/views/modal/exclusao.html',
			  controller: 'ExclusaoCtrl'
			}).then(function(modal) {				
			  modal.element.modal();
			  modal.close.then(function(result) {
				if(result){
				  var promises = [];	
				  promises.push(excluirPontuacao(ponto));				  			
				  $q.all(promises).then(function(retorno) {
					  if(retorno[0].type===1){
						  showErrorNotificationExcluir(retorno[0].msg);
					  }else{
						  showNotificationExcluir();							
						  var index = $scope.pontuacao.indexOf(ponto);
						  if (index > -1) {
							  $scope.pontuacao.splice(index,1);
						  }			
						  $scope.hasExcluded = true;				
					  }			
				  });
				}				  
			  });
			});
	  };
	  
	  function showNotificationExcluir() {
        Notification.success('Pontuação excluida com sucesso!');
    }
	
	function showErrorNotificationExcluir(erro) {
	   Notification.success('Erro ao excluir pontuação!');
	   Notification.error({message: erro.code, title: 'Erro ao excluir a pontuação!'});
    }
	
	
	promises.push(getAllPointsByEspecId());
	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
