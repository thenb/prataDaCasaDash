'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:RelatorioEspecificadoresCtrl
 * @description
 * # RelatorioEspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('RelatorioEspecificadoresCtrl',  function (Restangular, $scope, $filter, NgTableParams, $q, ModalService, $state, Notification, Excel, $timeout) {		
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	$scope.tipoUsuario = $scope.user.login.id_tipo_login;	
	$scope.especificadores = [];	
	var promises = [];	

	$scope.exportToExcel=function(tableId){ // ex: '#my-table'
	var exportHref=Excel.tableToExcel(tableId,'Relatório Especificadores');
	$timeout(function(){
		var a = document.createElement('a');
    a.href=exportHref;
    a.download = "Relatório_Especificadores.xls";
    document.body.appendChild(a);
    a.click();
    a.remove();}
		//location.href=exportHref;}
		,100); // trigger download
	}

	function init() {		
			console.log('especificadores');
			console.log($scope.especificadores);
	}		

	function getAllEspec() {		
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspec').getList().then(function(users) {
			console.log(users);
			users.map(function(user){			
				user.pontos= parseInt(user.pontos/100);								
			});				
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}	
	
	function showNotification() {
        Notification.success('Especificador excluido com sucesso!');
  	}
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao excluir o especificador!'});
  	}	

	$scope.exportar = function(empresa) {
		console.log("Exportou");
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, "Report.xls");
	};

	promises.push(getAllEspec());	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);	
  });
