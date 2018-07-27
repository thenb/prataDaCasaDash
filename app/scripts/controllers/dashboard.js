'use strict';

/**
* @ngdoc function
* @name prataAngularApp.controller:PontuacaoCtrl
* @description
* # PontuacaoCtrl
* Controller of the prataAngularApp
*/
angular.module('prataAngularApp')
.controller('DashboardCtrl', function (Restangular, $scope, $q, $rootScope, ModalService, $window) {      
	var promises = [];	
	  
	function init() {					
	}  

	function getAllPontByIdEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.user.especificador.id };		
		Restangular.all('api/getAllPontByIdEspec').post(JSON.stringify(params)).then(function(pont) {			
			var total =  0;
			pont.map(function(item){
				total+= item.pontos;				
			});			
			deffered.resolve(total);
			$scope.pontuacaoAtual = parseInt(total/100);
		});
		return deffered.promise;
	}	

	function getTotalIndicacoes() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.user.especificador.id };		
		Restangular.all('api/getTotalIndicacoes').post(JSON.stringify(params)).then(function(qtd) {				
			deffered.resolve(qtd);
			$scope.totalIndicacoes = qtd[0].qtd;
		});
		return deffered.promise;
	} 

	function getAllEmpresasVisited() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.user.login.id_login };		
		Restangular.all('api/getAllEmpresasVisited').post(JSON.stringify(params)).then(function(empresas) {			
			deffered.resolve(empresas);
			$scope.totalVisitas = empresas.length;			
		});
		return deffered.promise;
	} 

	function getTotalEspec() {			
		var deffered  = $q.defer();	
		Restangular.one('api/getTotalEspec').getList().then(function(qtd) {
			$scope.totalEspecificadores = qtd[0].qtd;							
			deffered.resolve($scope.totalClientes);
		});		
		return deffered.promise;
	} 	

	function getTotalClientes() {			
		var deffered  = $q.defer();	
		Restangular.one('api/getTotalClientes').getList().then(function(qtd) {
			$scope.totalClientes = qtd[0].qtd;							
			deffered.resolve($scope.totalClientes);
		});		
		return deffered.promise;
	} 

	function getTotalEmpresas() {			
		var deffered  = $q.defer();	
		Restangular.one('api/getTotalEmpresas').getList().then(function(qtd) {
			$scope.totalEmpresas = qtd[0].qtd;							
			deffered.resolve($scope.totalClientes);
		});		
		return deffered.promise;
	} 

	function getTotalPresencasByEmpresa() {		
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.user.empresa.id };		
		Restangular.all('api/getAllPresencaByEmpresa').post(JSON.stringify(params)).then(function(presencas) {			
			console.log(presencas);		
			$scope.totalPresencasByEmpresa = presencas[0].qtdPresencaCampanhaAtiva;
			deffered.resolve($scope.totalPresencasByEmpresa);
		});
		return deffered.promise;
	}
	
	function getTotalIndicacoesEmpresa() {
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.user.empresa.id };		
		Restangular.all('api/getTotalIndicacoesEmpresa').post(JSON.stringify(params)).then(function(ind) {			
			console.log(ind);		
			$scope.qtdIndicacaoEmpresa = ind[0].qtdIndicacaoEmpresa;
			deffered.resolve($scope.qtdIndicacaoEmpresa);
		});
		return deffered.promise;
	}
	
	function getTotalPontosEmpresa() {
		var deffered  = $q.defer();	
		var params = {  id_usuario : $scope.user.empresa.usuario_id };		
		Restangular.all('api/getTotalPontosEmpresa').post(JSON.stringify(params)).then(function(ind) {			
			var total =  0;
			ind.map(function(item){
				total+= item.pontos;				
			});			
			deffered.resolve(total);
			$scope.pontosEmpresa = parseInt(total/100);
		});
		return deffered.promise;
	}
	
	function aceitarTermos(cliente) {			
		var params = {  id_cliente : cliente };	
		var deffered  = $q.defer();				
		Restangular.all('api/aceiteCliente').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);
			}			
		});
		return deffered.promise;
	}
	

	if($scope.user.login.id_tipo_login==4 && $scope.user.cliente.aceite==0){
		var scope = $rootScope.$new();
		scope.params = {id_cliente: $scope.user.cliente.id};
		ModalService.showModal({
			scope: scope,
			templateUrl: '/views/modal/aceite.html',
			controller: 'AceiteModalCtrl'		
		}).then(function(modal) {				
			modal.element.modal();
			modal.close.then(function(result) {
				if(result){	
					var promises = [];						
					promises.push(aceitarTermos($scope.user.cliente.id));
					$q.all(promises).then(function(retorno) {
						$scope.user.cliente.aceite =1;
						console.log('aceite realizado com sucesso');			
					});
				}				  
			});
		});		
	}
	
	//console.log($scope.user.login.id_tipo_login);
	if($scope.user.login.id_tipo_login !=1 || $scope.user.login.id_tipo_login !=2 ){
		promises.push(getAllEmpresasVisited());
	}

	if($scope.user.especificador){
		promises.push(getAllPontByIdEspec());
		promises.push(getTotalIndicacoes());
	}

	if($scope.user.login.id_tipo_login == 2 ){
		promises.push(getTotalPresencasByEmpresa());	
		promises.push(getTotalIndicacoesEmpresa());
		promises.push(getTotalPontosEmpresa());
	}	



	if($scope.user.login.id_tipo_login == 1 ){
		promises.push(getTotalEspec());
		promises.push(getTotalClientes());
		promises.push(getTotalEmpresas());
	}	

	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
	

	
	




});
