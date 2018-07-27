'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('novaPontuacaoModalCtrl',  function ($scope, close, $q, Restangular, Notification, $element) {	
	
	console.log($scope.params);
	$scope.id_espec = $scope.params.especificador;
	$scope.id_login_espec = $scope.params.id_login_espec;
	$scope.id_campanha = $scope.params.id_campanha;
	$scope.id_usuario = $scope.params.id_usuario;
	$scope.id_login = $scope.params.id_login;
	$scope.nome = $scope.params.nome;
	$scope.nomeEmpresa = $scope.params.nomeEmpresa;
	$scope.pontuacao = {};
	$scope.submited = false;
	
	function novaPontuacao() {			
		var params = {  id_espec : $scope.id_espec, pontuacao : $scope.pontuacao , id_campanha : $scope.id_campanha, id_usuario : $scope.id_usuario  };	
		var pontos = $scope.pontuacao
		console.log($scope.pontuacao);
		var deffered  = $q.defer();				
		Restangular.all('api/novaPontuacao').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}				
			var params1 = {  id_login : $scope.id_login_espec};		
			Restangular.all('api/getLoginEspec').post(JSON.stringify(params1)).then(function(login) {					
				var email = login[0].email;
				var params1 = {  destino : email, assunto: '(Prata da Casa) Cadastro Pontuação', msg : 'Pontuação Recebida pela empresa '+$scope.nomeEmpresa+'. Pontos: '+pontos.valor/100+'.'};								
				Restangular.all('api/sendMail').post(JSON.stringify(params1)).then(function(email) {		
					if (email.error) {
						 deffered.reject(email.error);
					}else{
						console.log('ola')
						deffered.resolve(espec);
						
					}				
				});
			});	
		});
		return deffered.promise;
	}
	
	function pushNovaPontuacao() {	
		var params = {  pontuacao : $scope.pontuacao, id_login : $scope.id_login, nome : $scope.nome , token : '1234567890'};	
		var deffered  = $q.defer();				
		Restangular.all('api/pushNovaPontuacao').post(JSON.stringify(params)).then(function(espec) {		
			if (espec.error) {
				 deffered.reject(espec.error);
			}				
			return deffered.promise;
		});		
	}


	function showNotification() {
        Notification.success('Pontos cadastrado com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao cadastrar os pontos!'});
    }	
	
	
	$scope.close = function(result) {
		close(result, 1500); // close, but give 500ms for bootstrap to animate
	};
	
	$scope.save = function(formNovaPontuacao) {
		console.log(formNovaPontuacao);
		var promises = [];			
		$scope.submited = true;
		if(!formNovaPontuacao.$invalid){
			promises.push(novaPontuacao());	
			promises.push(pushNovaPontuacao());	
			
			$q.all(promises).then(function(retorno) {
				console.log(retorno)
				if(retorno[0].type===1){
					console.log('erro?')
					showErrorNotification(retorno[0].msg);
				}else{
					showNotification();							
					$element.modal('hide');	
					close({
						  name: $scope.name,
						  age: $scope.age
						}, 500); 					
				}			
			});		
		}		
	};
	
 });
