'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:CampanhasCtrl
 * @description
 * # CampanhasCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('CampanhasCtrl', function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, moment) {
    $scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.campanhas = [];	
	var promises = [];	
	
	
	function init() {			
	}	
	
	function getAllCamp() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllCamp').getList().then(function(camp) {
			$scope.campanhas = camp;
			$scope.campanhas.map(function(camp) {			  
				camp.data_inicio = new Date(camp.data_inicio);
				camp.data_fim = new Date(camp.data_fim);  
				camp.data_inicio_temp = moment(camp.data_inicio).format("DD-MM-YYYY");
				camp.data_fim_temp = moment(camp.data_fim).format("DD-MM-YYYY");
			});
			deffered.resolve($scope.campanhas);
		});
		return deffered.promise;
	}
	
	function excluirCampanha(campanha) {	
		console.log(campanha.id);
		var params = {  id_campanha : campanha.id };	
		var deffered  = $q.defer();				
		Restangular.all('api/excluirCampanha').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}
			
		});
		return deffered.promise;
	}
	
	function showNotificationExcluir() {
        Notification.success('Campanha excluida com sucesso!');
    }		
	
	function showErrorNotificationExcluir(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao excluir a campanha!'});
    }		
	
	$scope.novo = function () {
		$state.go('campanha', {novo: true});
	};
	
	$scope.editar = function (campanha) {
		$state.go('campanha', {novo: false, campanha: campanha });
	};
	
	$scope.excluir = function(campanha) {
          ModalService.showModal({
				templateUrl: '/views/modal/exclusao.html',
				controller: 'ExclusaoCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(excluirCampanha(campanha));	
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotificationExcluir(retorno[0].msg);
						}else{
							showNotificationExcluir();							
							var index = $scope.campanhas.indexOf(campanha);
							if (index > -1) {
								$scope.campanhas.splice(index,1);
							}							
						}			
					});
				  }				  
				});
			  });
	};

	
	promises.push(getAllCamp());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


