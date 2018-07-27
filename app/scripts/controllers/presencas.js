'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:PresencasCtrl
 * @description
 * # PresencasCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('PresencasCtrl', function ($scope, Restangular, $q, Notification) {
	  
	$scope.empresas = {};
	$scope.presenca = {};
	$scope.presentes = [];	
	$scope.submited = false;
	var promises = [];	
	
	function init() {			
					
	}	
	
	function getAllEmpre() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEmpresas').getList().then(function(users) {
			$scope.empresas = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	function showNotification() {
        Notification.success('Presença cadastrada!');
    }		
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao cadastrar a presença!'});
    }
	
	$scope.novo = function (formPresenca) {
		$scope.submited = true;		
		if(!formPresenca.$invalid){			
			if($scope.presentes.length!=0){
				var params = {  presenca : $scope.presenca, presentes : $scope.presentes  };	
				var deffered  = $q.defer();	
				Restangular.all('api/cadastrarPresenca').post(JSON.stringify(params)).then(function(espec) {		
					if (espec.error) {
						showErrorNotification(retorno[0].msg);
					}else{
						showNotification();		
						$scope.presenca = {};
						$scope.presentes = [];
						$scope.submited = false;											
					}			
				});
			}		
		}
	};	
	
	promises.push(getAllEmpre());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
    
  });
