'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EmpresasCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('VisitasCtrl',  function (Restangular, $scope, $filter, $q, ModalService, Notification, $rootScope) {	
	
	
	$scope.sortType     = ['nome']; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchFish   = '';     // set the default search/filter term
	
	var promises = [];	
	$scope.especificadores = [];	
	$scope.empresas = [];
	
	
	
	function init() {		
						
	}		
	
	function getAllEspec() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspec').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	function getAllClientes() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllClientes').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	function getAllEmpreVisited(id_login) {			
		var params = {  id_login : id_login };	
		var deffered  = $q.defer();				
		Restangular.all('api/getAllEmpresasVisited').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				espec.map(function(item){
					if(item.data){
						item.data = moment(item.data).format('DD-MM-YYYY')
					}				
				});				
				deffered.resolve(espec);
				$scope.empresas = espec ;
				console.log(espec);
			}
			
		});
		return deffered.promise;
	}
	
	
	function cadastrarNovaVisita(visita, id_login_empresa) {			
		var params = {  visita : visita, id_login_empresa: id_login_empresa };	
		var deffered  = $q.defer();				
		Restangular.all('api/cadastrarVisita').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}	
	
	function pushNovaVisita(visita) {	
		console.log($scope.user);
				
		var params = {  nome : visita.nome, nome_empresa: $scope.user.empresa.nome, id_login : visita.id_login };	
		
		var deffered  = $q.defer();				
		Restangular.all('api/pushNovaVisita').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}				
			return deffered.promise;
		});		
	}	
	
	function showNotification() {
        Notification.success('Visita Cadastrada com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao cadastrar visita!'});
    }	
	
	
	//functions on view
	$scope.changeTipos = function(tipoSelecionado) {	
		var promisesTipo = [];	
		if($scope.tipoSelecionado.id==2){
			promisesTipo.push(getAllClientes());
		}
		if($scope.tipoSelecionado.id==3){
			promisesTipo.push(getAllEspec());
		}
		if($scope.tipoSelecionado.id==1){
			$scope.especificadores = [];
		}
		$q.all(promisesTipo).then(function() {			
		});		
	};	
	
	$scope.cadastrarVisita = function(visita) {		
         console.log(visita);
		 ModalService.showModal({
				templateUrl: '/views/modal/novaVisitaModal.html',
				controller: 'AprovarCtrl'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {
				  if(result){
					var promises = [];	
					promises.push(cadastrarNovaVisita(visita, $scope.user.login.id_login));	
					promises.push(pushNovaVisita(visita));	
					
					$q.all(promises).then(function(retorno) {
						if(retorno[0].type===1){
							showErrorNotification(retorno[0].msg);
						}else{
							showNotification();	
													
						}			
					});
				  }				  
				});
			  });
	};
	
	$scope.visualizar = function(user) {	
		console.log(user)	
        var scope = $rootScope.$new();
		scope.params = {id_login: user.id_login, nome : user.nome, tipo: $scope.tipoSelecionado.id};
		ModalService.showModal({
				scope: scope,
				templateUrl: '/views/modal/visualizarVisitas.html',
				controller: 'VisualizarVisitas'
			  }).then(function(modal) {				
				modal.element.modal();
				modal.close.then(function(result) {				  				  
				});
			  });
	};
	
	if($scope.user.login.id_tipo_login == 3 || $scope.user.login.id_tipo_login == 4){
		promises.push(getAllEmpreVisited($scope.user.login.id_login));		
		
		$q.all(promises).then(
			function() {
				init();		
			}	
		);	
	}else if($scope.user.login.id_tipo_login == 2){	
		$scope.tipos = [
		  {id: '1', name: 'Selecione'},
		  {id: '2', name: 'Clientes'},
		  {id: '3', name: 'Especificadores'}
		];
		
		$scope.tipoSelecionado= {id: '1', name: 'Selecione'} ;	
		
	}
	
	
	
	
  });
