'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('PerfilCtrl', function (Restangular, $scope, $http, $state, $q, Notification, moment) {

	$scope.perfil = {};
	$scope.login = {};
	
	$scope.submited = false;
	

	if($scope.user.especificador){
		$scope.perfil = angular.copy($scope.user.especificador);
		if($scope.perfil.data_nascimento){
			$scope.perfil.data_nascimento = new Date($scope.perfil.data_nascimento);			
		}		
	}	
	if($scope.user.cliente){
		$scope.perfil = angular.copy($scope.user.cliente);
		if($scope.perfil.data_nascimento){
			console.log('rebtra?')
			$scope.perfil.data_nascimento = new Date($scope.perfil.data_nascimento);			
		}
	}	
	if($scope.user.empresa){
		$scope.perfil = angular.copy($scope.user.empresa);
	}	
	console.log($scope.perfil);	
	$scope.login = angular.copy($scope.user.login);	
	$scope.perfilUrl = $scope.login.url_perfil;
	
	function editarNomeEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, nome : $scope.perfil.nome  };		
		Restangular.all('/api/especificadorUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarNomeCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, nome : $scope.perfil.nome  };		
		Restangular.all('/api/clienteUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarNomeEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, nome : $scope.perfil.nome  };		
		Restangular.all('/api/empresaUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSobrenomeEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, sobrenome : $scope.perfil.sobrenome  };		
		Restangular.all('/api/especificadorUpdateSobrenome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSobrenomeCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, sobrenome : $scope.perfil.sobrenome  };		
		Restangular.all('/api/clienteUpdateSobrenome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEmpresaSegmento() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, segmento : $scope.perfil.segmento  };		
		Restangular.all('/api/empresaUpdateSegmento').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEmpresaEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, empresa : $scope.perfil.empresa  };		
		Restangular.all('/api/especificadorUpdateEmpresa').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}

	function editarEmpresaCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, empresa : $scope.perfil.empresa  };		
		Restangular.all('/api/clienteUpdateEmpresa').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	
	
	function editarNascimentoEspec() {			
		var deffered  = $q.defer();	
		var data = moment($scope.perfil.data_nascimento).format("YYYY-MM-DD");   	
		var params = {  id_especificador : $scope.perfil.id, data_nascimento : data  };		
		Restangular.all('/api/especificadorUpdateNascimento').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarNascimentoCliente() {			
		var deffered  = $q.defer();	
		var data = moment($scope.perfil.data_nascimento).format("YYYY-MM-DD");
		var params = {  id_cliente : $scope.perfil.id, data_nascimento : data  };		
		Restangular.all('/api/clienteUpdateDataNascimento').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarCpfEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, cpf : $scope.perfil.cpf  };		
		Restangular.all('/api/especificadorUpdateCpf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarRgEspec() {			
	var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, rg : $scope.perfil.rg  };		
		Restangular.all('/api/especificadorUpdateRg').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarTelefoneEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, telefone : $scope.perfil.telefone  };		
		Restangular.all('/api/especificadorUpdateTelefone').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarTelefoneCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, telefone : $scope.perfil.telefone  };		
		Restangular.all('/api/clienteUpdateTelefone').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarTelefoneEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, telefone : $scope.perfil.telefone  };		
		Restangular.all('/api/empresaUpdateTelefone1').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarCelularEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, celular : $scope.perfil.celular  };		
		Restangular.all('/api/especificadorUpdateCelular').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarCelularCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, celular : $scope.perfil.celular  };		
		Restangular.all('/api/clienteUpdateCelular').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarCelularEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, celular : $scope.perfil.celular  };		
		Restangular.all('/api/empresaUpdateTelefone2').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarProfissaoEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, profissao : $scope.perfil.profissao  };		
		Restangular.all('/api/especificadorUpdateProfissao').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarCepEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, cep : $scope.perfil.cep  };		
		Restangular.all('/api/especificadorUpdateCep').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarCepCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, cep : $scope.perfil.cep  };		
		Restangular.all('/api/clienteUpdateCep').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarCepEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, cep : $scope.perfil.cep  };		
		Restangular.all('/api/empresaUpdateCep').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarEnderecoEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, endereco : $scope.perfil.endereco  };		
		Restangular.all('/api/especificadorUpdateEndereco').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarEnderecoCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, endereco : $scope.perfil.endereco  };		
		Restangular.all('/api/clienteUpdateEndereco').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarEnderecoEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, endereco : $scope.perfil.endereco  };		
		Restangular.all('/api/empresaUpdateEndereco').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarNumeroEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, numero : $scope.perfil.numero  };		
		Restangular.all('/api/especificadorUpdateNumero').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarNumeroCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, numero : $scope.perfil.numero  };		
		Restangular.all('/api/clienteUpdateNumero').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarNumeroEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, numero : $scope.perfil.numero  };		
		Restangular.all('/api/empresaUpdateNumero').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarBairroEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, bairro : $scope.perfil.bairro  };		
		Restangular.all('/api/especificadorUpdateBairro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarBairroCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, bairro : $scope.perfil.bairro  };		
		Restangular.all('/api/clienteUpdateBairro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarBairroEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, bairro : $scope.perfil.bairro  };		
		Restangular.all('/api/empresaUpdateBairro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarCidadeEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, cidade : $scope.perfil.cidade  };		
		Restangular.all('/api/especificadorUpdateCidade').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarCidadeCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, cidade : $scope.perfil.cidade  };		
		Restangular.all('/api/clienteUpdateCidade').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarCidadeEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, cidade : $scope.perfil.cidade  };		
		Restangular.all('/api/empresaUpdateCidade').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarUfEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, uf : $scope.perfil.uf  };		
		Restangular.all('/api/especificadorUpdateUf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarUfCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.perfil.id, uf : $scope.perfil.uf  };		
		Restangular.all('/api/clienteUpdateUf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarUfEmpresa() {			
		var deffered  = $q.defer();	
		var params = {  id_empresa : $scope.perfil.id, uf : $scope.perfil.uf  };		
		Restangular.all('/api/empresaUpdateUf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}
	
	function editarDadosEspec() {			
		var deffered  = $q.defer();	
		var params = {  id_especificador : $scope.perfil.id, dados_bancarios : $scope.perfil.dados_bancarios  };		
		Restangular.all('/api/especificadorUpdateDados').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function editarImagemPerfil(item) {			
		var deffered  = $q.defer();		
		var file = item.file[0]
		var formData = new FormData();
		formData.append('file', file);		
		Restangular.all('/api/editarImagemPerfil').withHttpConfig({transformRequest: angular.identity}).customPOST(formData, undefined, undefined,{ 'Content-Type': undefined }).then(function(image) {					
			deffered.resolve(image);			
		});
		return deffered.promise;	
	}
	
	function editarUrlLogin(url) {			
		var deffered  = $q.defer();	
		var params = {  url : url, id_login : $scope.login.id_login  };		
		Restangular.all('/api/updateUrlPerfil').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;	
	}	
	
	
	
	function editarSenhaPerfil() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.login.id_login, senha : $scope.login.senha  };		
		Restangular.all('/api/perfilUpdateSenha').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function showNotificationEditar() {
        Notification.success('Perfil Editado com sucesso!');
    }	
	
	function showErrorNotificationEditar(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao editar o perfil!'});
    }
	
	$scope.salvar = function (formPerfil) {			
		var promises = [];		
		$scope.submited = true;	
		console.log(formPerfil);
		if(!formPerfil.$invalid){			
			//geral
			if(formPerfil.nome.$dirty){
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarNomeEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarNomeCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarNomeEmpresa());
				}	
			
			}
			if(formPerfil.sobrenome.$dirty){
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarSobrenomeEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarSobrenomeCliente());
				}			
			}
			
			if(formPerfil.telefone.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarTelefoneEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarTelefoneCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarTelefoneEmpresa());
				}			
			}			
			if(formPerfil.celular.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarCelularEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarCelularCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarCelularEmpresa());
				}			
			}			
			if(formPerfil.cep.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarCepEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarCepCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarCepEmpresa());
				}
			}			
			if(formPerfil.endereco.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarEnderecoEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarEnderecoCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarEnderecoEmpresa());
				}
			}			
			if(formPerfil.numero.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarNumeroEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarNumeroCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarNumeroEmpresa());
				}
			}			
			if(formPerfil.bairro.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarBairroEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarBairroCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarBairroEmpresa());
				}
			}			
			if(formPerfil.cidade.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarCidadeEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarCidadeCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarCidadeEmpresa());
				}
			}			
			if(formPerfil.uf.$dirty){			
				if($scope.user.login.id_tipo_login==3){
					promises.push(editarUfEspec());
				}
				if($scope.user.login.id_tipo_login==4){
					promises.push(editarUfCliente());
				}
				if($scope.user.login.id_tipo_login==2){
					promises.push(editarUfEmpresa());
				}
			}			
			if(formPerfil.senha.$dirty && formPerfil.repetir_senha.$dirty){
				if($scope.login.repetir_senha == $scope.login.senha  ){
					promises.push(editarSenhaPerfil());	
				}else{
					var erro = {}
					erro.code = 'As senhas não são iguais';
					showErrorNotificationEditar(erro);
				}
				
			}			
			//empresa
			if($scope.user.login.id_tipo_login==2){
				if(formPerfil.segmento.$dirty){
					promises.push(editarEmpresaSegmento());						
				}	
			}			
			//apenas para cliente e especificador
			if($scope.user.login.id_tipo_login==3 || $scope.user.login.id_tipo_login==4){
				if(formPerfil.data_nascimento.$dirty){
					if($scope.user.login.id_tipo_login==3){
						promises.push(editarNascimentoEspec());
					}
					if($scope.user.login.id_tipo_login==4){
						promises.push(editarNascimentoCliente());
					}			
				}
				if($scope.user.login.id_tipo_login==3){
					if(formPerfil.empresa.$dirty){
						if($scope.user.login.id_tipo_login==3){
							promises.push(editarEmpresaEspec());
						}
						if($scope.user.login.id_tipo_login==4){
							promises.push(editarEmpresaCliente());
						}			
					}
				}
				
			}			
			//especificador
			if($scope.user.login.id_tipo_login==3){
				if(formPerfil.cpf.$dirty){			
						promises.push(editarCpfEspec());
				}
				
				if(formPerfil.rg.$dirty){			
					promises.push(editarRgEspec());				
				}
				
				if(formPerfil.profissao.$dirty){			
					promises.push(editarProfissaoEspec());	
				}
				
				if(formPerfil.dados_bancarios.$dirty){			
					promises.push(editarDadosEspec());	
				}
			}		
			
			$q.all(promises).then(function(retorno) {
					if(retorno.length!=0){
						if(retorno[0].type===1){
						showErrorNotificationEditar(retorno[0].msg);
						}else{
							if($scope.user.especificador){
								$scope.user.especificador =  $scope.perfil;
							}
							if($scope.user.cliente){
								$scope.user.cliente =  $scope.perfil;
							}	
							if($scope.user.empresa){
								$scope.user.empresa =  $scope.perfil;
							}
							showNotificationEditar();		
							$state.go('dashboard');							
						}
					}else {
						$state.go('dashboard');
					}
					
						
			});		
		}	
	};
	
	$scope.files = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
			console.log(args);
			var promises = [];	
			promises.push(editarImagemPerfil(args));
			$q.all(promises).then(function(retorno) {				
				if(retorno.length>0){
					$scope.perfilUrl = retorno[0].Location;
					$scope.user.login.url_perfil = $scope.perfilUrl;
					console.log($scope.perfilUrl);
					var promisesURL = [];	
					promisesURL.push(editarUrlLogin($scope.perfilUrl));
					$q.all(promisesURL).then(function(retorno1) {				
						if(retorno1.length>0){							
							console.log('Salvou url no banco');					
						}				
					});	
				}				
			});	
        });
    });
	
		
	$scope.cancelar = function () {			
			$state.go('dashboard');	
	};
	
	
	
	
	
});
