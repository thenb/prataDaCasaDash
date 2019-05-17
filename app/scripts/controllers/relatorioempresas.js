'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:RelatorioEmpresasCtrl
 * @description
 * # RelatorioEmpresasCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('RelatorioEmpresasCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, Excel, $timeout) {		
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	$scope.empresas = [];	
	var promises = [];	

	$scope.exportToExcel=function(tableId){ // ex: '#my-table'
	var exportHref=Excel.tableToExcel(tableId,'Relatório Empresas');
	$timeout(function(){
		var a = document.createElement('a');
    a.href=exportHref;
    a.download = "Relatório_Empresas.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();}
		//location.href=exportHref;}
		,100); // trigger download
	}
	
	function init() {				
	}		
	
	function getAllEmpre() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEmpresas').getList().then(function(users) {
			users.map(function(user){			
				user.pontosEmpresa= parseInt(user.pontosEmpresa/100);								
			});				
			$scope.empresas = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}

	
	function showNotificationExcluir() {
        Notification.success('Empresa excluida com sucesso!');
  }
	
	function showErrorNotificationExcluir(erro) {
	   Notification.success('Erro ao excluir empresa!');
	   Notification.error({message: erro.code, title: 'Erro ao excluir a empresa!'});
  }	

	
	
		


	
	promises.push(getAllEmpre());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
