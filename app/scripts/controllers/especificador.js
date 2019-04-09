'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadorCtrl
 * @description
 * # EspecificadorCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('EspecificadorCtrl', function (Restangular, $scope, $http, $state, $q, Notification, moment) {
	
	var promisesInit = [];	
	$scope.especificador1 = {};
	$scope.submited = false;
	$scope.especTempMail = {}; 

	
	function getLoginEspec(especificador) {			
		var deffered  = $q.defer();	
		var params = {  id_login : especificador.id_login};		
		Restangular.all('api/getLoginEspec').post(JSON.stringify(params)).then(function(login) {					
			console.log(login);
			$scope.especificador1.login = login[0];
			$scope.especificador1.email = $scope.especificador1.login.email;
			deffered.resolve($scope.especificador1.email);
		});
		return deffered.promise;
	}	
	
	$scope.view = $state.params.view
	$scope.novo = $state.params.novo;
	$scope.edit = $state.params.edit;
	
	if(typeof $state.params.novo === 'undefined'){
			$state.go('especificadores');
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
		
		$scope.especificador1 = $state.params.espec;	
		if(typeof $scope.especificador1.data_nascimento !='undefined' || $scope.especificador1.data_nascimento!= 'null' ){
			$scope.especificador1.data_nascimento = new Date($scope.especificador1.data_nascimento);	
		}	
		
		$scope.especificador1.id_login = $scope.especificador1.id_login;
		promisesInit.push(getLoginEspec($scope.especificador1));			
	}
	
	function init() {
		
		
		
	}
	
	function editarNomeEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, nome : $scope.especificador1.nome};		
		Restangular.all('/api/especificadorUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSobrenomeEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, sobrenome : $scope.especificador1.sobrenome  };		
		Restangular.all('/api/especificadorUpdateSobrenome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEmpresaEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, empresa : $scope.especificador1.empresa  };		
		Restangular.all('/api/especificadorUpdateEmpresa').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEmailEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.especificador1.id_login, email : $scope.especificador1.email  };		
		Restangular.all('/api/especificadorUpdateEmail').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarNascimentoEspec() {			
		var deffered  = $q.defer();	
		var data = moment($scope.especificador1.data_nascimento).format("YYYY-MM-DD");			  		
		var params = {  id_especificador : $scope.especificador1.id, data_nascimento : data  };		
		Restangular.all('/api/especificadorUpdateNascimento').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarCpfEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, cpf : $scope.especificador1.cpf  };		
		Restangular.all('/api/especificadorUpdateCpf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarRgEspec() {			
	var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, rg : $scope.especificador1.rg  };		
		Restangular.all('/api/especificadorUpdateRg').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarTelefoneEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, telefone : $scope.especificador1.telefone  };		
		Restangular.all('/api/especificadorUpdateTelefone').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarCelularEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, celular : $scope.especificador1.celular  };		
		Restangular.all('/api/especificadorUpdateCelular').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarProfissaoEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, profissao : $scope.especificador1.profissao  };		
		Restangular.all('/api/especificadorUpdateProfissao').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarCepEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, cep : $scope.especificador1.cep  };		
		Restangular.all('/api/especificadorUpdateCep').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarEnderecoEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, endereco : $scope.especificador1.endereco  };		
		Restangular.all('/api/especificadorUpdateEndereco').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarNumeroEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, numero : $scope.especificador1.numero  };		
		Restangular.all('/api/especificadorUpdateNumero').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarBairroEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, bairro : $scope.especificador1.bairro  };		
		Restangular.all('/api/especificadorUpdateBairro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarCidadeEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, cidade : $scope.especificador1.cidade  };		
		Restangular.all('/api/especificadorUpdateCidade').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarUfEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, uf : $scope.especificador1.uf  };		
		Restangular.all('/api/especificadorUpdateUf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarDadosEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.especificador1.id, dados_bancarios : $scope.especificador1.dados_bancarios  };		
		Restangular.all('/api/especificadorUpdateDados').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarSenhaPerfil() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.especificador1.id_login, senha : $scope.especificador1.senha  };		
		Restangular.all('/api/perfilUpdateSenha').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function salvarEspec() {			
		var deffered  = $q.defer();
		//converter a data	
		var especificador = $scope.especificador1;
		especificador.data_nascimento = moment($scope.especificador1.data_nascimento).format("YYYY-MM-DD");			
		var params = {  especificador : especificador };	
		Restangular.all('/api/saveEspec').post(JSON.stringify(params)).then(function(espec) {					
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);	
				$scope.especTempMail = espec;				
			}			
		});
		return deffered.promise;
	}

	function sendMail(){	
		var email = $scope.especTempMail.emailRetorno;						
		var params1 = {  destino : email, assunto: '(Prata da Casa) Cadastro de Especificador', msg : 'Bem-Vindo ao Prata da Casa, sua senha é:'+$scope.especTempMail.senhaRetorno};								
		Restangular.all('api/sendMail').post(JSON.stringify(params1)).then(function(email) {		
			if (email.error) {
				console.log('Erro ao enviar o email');
				deffered.reject(email.error);
			}else{
				deffered.resolve(email);
			}				
		});		
	} 
	
	function showNotification() {
        Notification.success('Especificador cadastrado com sucesso!');
    }
	
	function showNotificationEditar() {
        Notification.success('Especificador Editado com sucesso!');
    }
	function showErrorNotification(erro) {
	   Notification.error({message: erro, title: 'Erro ao cadastrar o especificador!'});
    }
	
	function showErrorNotificationEditar(erro) {
	   Notification.error({message: erro, title: 'Erro ao editar o especificador!'});
    }	
	
	$scope.salvar = function (formEspec) {			
		$scope.submited = true;
		var promises = [];	
		//Novo
		if($state.params.novo){				
			if(!formEspec.$invalid){			
				promises.push(salvarEspec());				
				$q.all(promises).then(function(retorno) {
					if(retorno[0].type===1){
						showErrorNotification(retorno[0].msg);
					}else{
						showNotification();		
						sendMail();	
						$state.go('especificadores');							
					}			
				});						
			}	
		//Edicao
		}else{
			console.log(formEspec);
			if(!formEspec.$invalid){				
				if(formEspec.nome.$dirty){
					promises.push(editarNomeEspec());	
				}
				if(formEspec.sobrenome.$dirty){
					promises.push(editarSobrenomeEspec());	
				}				
				if(formEspec.empresa.$dirty){
					promises.push(editarEmpresaEspec());	
				}
				
				if(formEspec.email.$dirty){
					promises.push(editarEmailEspec());	
				}
				
				if(formEspec.data_nascimento.$dirty){
					promises.push(editarNascimentoEspec());	
				}
				
				if(formEspec.cpf.$dirty){
					promises.push(editarCpfEspec());	
				}
				
				if(formEspec.rg.$dirty){
					promises.push(editarRgEspec());	
				}	
				
				if(formEspec.telefone.$dirty){
					promises.push(editarTelefoneEspec());	
				}
				
				if(formEspec.celular.$dirty){
					promises.push(editarCelularEspec());	
				}
				
				if(formEspec.profissao.$dirty){
					promises.push(editarProfissaoEspec());	
				}
				
				if(formEspec.cep.$dirty){
					promises.push(editarCepEspec());	
				}
				
				if(formEspec.endereco.$dirty){
					promises.push(editarEnderecoEspec());	
				}
				
				if(formEspec.numero.$dirty){
					promises.push(editarNumeroEspec());	
				}
				
				if(formEspec.bairro.$dirty){
					promises.push(editarBairroEspec());	
				}
				
				if(formEspec.cidade.$dirty){
					promises.push(editarCidadeEspec());	
				}
				
				if(formEspec.uf.$dirty){
					promises.push(editarUfEspec());	
				}
				
				if(formEspec.dadosBancarios.$dirty){
					promises.push(editarDadosEspec());	
				}

				if(formEspec.senha.$dirty && formEspec.repetir_senha.$dirty){
					if($scope.especificador1.repetir_senha == $scope.especificador1.senha  ){
						promises.push(editarSenhaPerfil());	
					}else{
						var erro = {}
						erro.code = 'As senhas não são iguais';
						showErrorNotificationEditar(erro);
					}
				}
				
				$q.all(promises).then(function(retorno) {
					if(retorno.length>0){
						if(retorno[0].type===1){
						showErrorNotificationEditar(retorno[0].msg);
						}else{
							showNotificationEditar();									
							$state.go('especificadores');							
						}	
					}								
				});
			}
		}
	};
	
	$scope.cancelar = function () {	
		if($scope.aprovar){
			$state.go('aprovarEspec');	
		}else{
			$state.go('especificadores');		
		}
		
	};
	
	
	
	$q.all(promisesInit).then(function(prom) {
			console.log(prom);
			init();		
		}	
	);
	
	
  });
