'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadorCtrl
 * @description
 * # EspecificadorCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('ClienteCtrl', function (Restangular, $scope, $http, $state, $q, Notification, moment) {
	
	var promisesInit = [];	
	$scope.cliente1 = {};
	$scope.submited = false;	
	
	//variavel para guardar dados para o envio de email
	$scope.clienteTempMail = {};
	
	$scope.view = $state.params.view
	$scope.novo = $state.params.novo;
	$scope.edit = $state.params.edit;
	
	if(typeof $state.params.novo === 'undefined'){
			$state.go('clientes');
	}
		
	if($state.params.novo){
		$scope.operacao = 'Indicar';	
		$scope.cliente1.tipo = 0;
		$scope.cliente1.terrea = 0;
	}else{
		if($scope.view){
			$scope.operacao = 'Visualizar';			
		}else {
			$scope.operacao = 'Editar';			
		}	
		$scope.cliente1 = $state.params.cliente;	
		if($scope.cliente1.data_nascimento){
			$scope.cliente1.data_nascimento = new Date($scope.cliente1.data_nascimento);		
		}
		
		if($scope.cliente1.fase1){
			$scope.cliente1.fase1 = true;
		}else{
			$scope.cliente1.fase1 = false;
		}
		
		if($scope.cliente1.fase2){
			$scope.cliente1.fase2 = true;
		}else{
			$scope.cliente1.fase2 = false;
		}
		
		if($scope.cliente1.fase3){
			$scope.cliente1.fase3 = true;
		}else{
			$scope.cliente1.fase3 = false;
		}
		
		if($scope.cliente1.fase4){
			$scope.cliente1.fase4 = true;
		}else{
			$scope.cliente1.fase4 = false;
		}
		
		if($scope.cliente1.fase5){
			$scope.cliente1.fase5 = true;
		}else{
			$scope.cliente1.fase5 = false;
		}
		
		if($scope.cliente1.fase6){
			$scope.cliente1.fase6 = true;
		}else{
			$scope.cliente1.fase6 = false;
		}
		
		if($scope.cliente1.fase7){
			$scope.cliente1.fase7 = true;
		}else{
			$scope.cliente1.fase7 = false;
		}
		
		if($scope.cliente1.fase8){
			$scope.cliente1.fase8 = true;
		}else{
			$scope.cliente1.fase8 = false;
		}
		
		if($scope.cliente1.fase9){
			$scope.cliente1.fase9 = true;
		}else{
			$scope.cliente1.fase9 = false;
		}
		
	}
	
	function init() {
		console.log($scope.cliente1);
		console.log($scope.especificadores);
		$scope.especificadores.map(function(espe) {			  
			if(espe.id == $scope.cliente1.id_indicou ){					
				$scope.indicou = espe;
			}			
			if(espe.id == $scope.cliente1.id_especificador){
				$scope.especificador = espe;
				console.log($scope.especificador)
			}				
		});
	}	
	
	function getAllEspecNoPoints() {			
		var deffered  = $q.defer();		
		Restangular.one('api/getAllEspecForIndicacao').getList().then(function(especificadores) {
			$scope.especificadores = especificadores;
			deffered.resolve(especificadores);
		});
		return deffered.promise;
	}
	
	$scope.selectedIndicou = function(selected) {
      if (selected) {
		$scope.cliente1.indicou = selected.originalObject;
		$scope.cliente1.id_indicou = selected.originalObject.id;		
      } else {
		$scope.cliente1.id_indicou = undefined;      
      }
    };
	
	$scope.selectedEspecificador = function(selected) {
      if (selected) {
        console.log(selected);
		$scope.cliente1.especificadorDaObra = selected.originalObject;
		$scope.cliente1.telefone1Especificador = selected.originalObject.telefone;
		$scope.cliente1.telefone2Especificador = selected.originalObject.celular;
		$scope.cliente1.emailEspecificador = selected.originalObject.email;
		$scope.cliente1.id_especificador = selected.originalObject.id;		
      } else {
		$scope.cliente1.id_especificador = undefined;  
		$scope.cliente1.especificadorDaObra = undefined;
		$scope.cliente1.telefone1Especificador = undefined;
		$scope.cliente1.telefone2Especificador = undefined;
		$scope.cliente1.emailEspecificador = undefined;
			
      }
    };
	
	function showNotification() {
        Notification.success('Cliente cadastrado com sucesso!');
		}
		
	function sendMail(){		
		var email = $scope.clienteTempMail.emailRetorno;
		var params1 = {  destino : email, assunto: '(Prata da Casa) Cadastro de Cliente', msg : 'Bem-Vindo ao Prata da Casa, sua senha é:'+$scope.clienteTempMail.senhaRetorno};								
		Restangular.all('api/sendMail').post(JSON.stringify(params1)).then(function(email) {		
			if (email.error) {
				console.log('Erro ao enviar o email');
				deffered.reject(email.error);
			}else{
				deffered.resolve(email);
			}				
		});		
	} 
	
	function showNotificationEditar() {
        Notification.success('Cliente Editado com sucesso!');
    }
	
	function showErrorNotification(erro) {
	   Notification.error({message: erro, title: 'Erro ao cadastrar o cliente!'});
    }
	
	function showErrorNotificationEditar(erro) {
	   Notification.error({message: erro.code, title: 'Erro ao editar o cliente!'});
    }
	
	function salvarCliente() {			
		var deffered  = $q.defer();
		//converter a data
		
		if($scope.user.empresa){
			$scope.cliente1.tipo_id_indicou = 2 //empresa
			$scope.cliente1.empresa = $scope.user.empresa.id
		}else{
			$scope.cliente1.tipo_id_indicou = 1 //admin
			$scope.cliente1.empresa = 17; //admin
		}
		var cliente = $scope.cliente1;
		if(typeof $scope.cliente1.data_nascimento !='undefined'){
			cliente.data_nascimento = moment($scope.cliente1.data_nascimento).format("YYYY-MM-DD");	
		}				
		var params = {  cliente : cliente};	
		Restangular.all('api/saveCliente').post(JSON.stringify(params)).then(function(espec) {					
			if (espec.error) {
				 deffered.reject(espec.error);
			}else{
				deffered.resolve(espec);	
				$scope.clienteTempMail = espec;
			}	

		});
		return deffered.promise;
	}	
	
	function editarNomeCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, nome : $scope.cliente1.nome  };		
		Restangular.all('api/clienteUpdateNome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSobrenomeCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, sobrenome : $scope.cliente1.sobrenome  };		
		Restangular.all('api/clienteUpdateSobrenome').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	
	function editarEmpresaCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, empresa : $scope.cliente1.empresa  };		
		Restangular.all('api/clienteUpdateEmpresa').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarDataNascimentoCliente() {			
		var deffered  = $q.defer();	
		var data = moment($scope.cliente1.data_nascimento).format("YYYY-MM-DD");
		var params = {  id_cliente : $scope.cliente1.id, data_nascimento : data  };		
		Restangular.all('api/clienteUpdateDataNascimento').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	

	function editarTelefoneCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, telefone : $scope.cliente1.telefone  };		
		Restangular.all('api/clienteUpdateTelefone').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarCelularCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, celular : $scope.cliente1.celular  };		
		Restangular.all('api/clienteUpdateCelular').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	
	
	function editarCepCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, cep : $scope.cliente1.cep  };		
		Restangular.all('api/clienteUpdateCep').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEnderecoCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, endereco : $scope.cliente1.endereco  };		
		Restangular.all('api/clienteUpdateEndereco').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarBairroCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, bairro : $scope.cliente1.bairro  };		
		Restangular.all('api/clienteUpdateBairro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarNumeroCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, numero : $scope.cliente1.numero  };		
		Restangular.all('api/clienteUpdateNumero').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarCidadeCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, cidade : $scope.cliente1.cidade  };		
		Restangular.all('api/clienteUpdateCidade').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarUfCliente() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, uf : $scope.cliente1.uf  };		
		Restangular.all('api/clienteUpdateUf').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	function editarFase1() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase1 : $scope.cliente1.fase1  };		
		Restangular.all('api/clienteUpdateFase1').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase2() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase2 : $scope.cliente1.fase2  };		
		Restangular.all('api/clienteUpdateFase2').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase3() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase3 : $scope.cliente1.fase3  };		
		Restangular.all('api/clienteUpdateFase3').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase4() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase4 : $scope.cliente1.fase4 };		
		Restangular.all('api/clienteUpdateFase4').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase5() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase5 : $scope.cliente1.fase3  };		
		Restangular.all('api/clienteUpdateFase5').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase6() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase6 : $scope.cliente1.fase6  };		
		Restangular.all('api/clienteUpdateFase6').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase7() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase7 : $scope.cliente1.fase7  };		
		Restangular.all('api/clienteUpdateFase7').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase8() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase8 : $scope.cliente1.fase8  };		
		Restangular.all('api/clienteUpdateFase8').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarFase9() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, fase9 : $scope.cliente1.fase9  };		
		Restangular.all('api/clienteUpdateFase9').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarTipo(tipo1) {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, tipo : tipo1  };		
		Restangular.all('api/clienteUpdateTipo').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarTerrea(terrea1) {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, terrea : terrea1  };		
		Restangular.all('api/clienteUpdateTerrea').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarEspecificador() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, id_especificador : $scope.cliente1.id_especificador  };		
		Restangular.all('api/clienteUpdateEspecificador').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarNomeEmpreiteiro() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, nome_empreiteiro : $scope.cliente1.nome_empreiteiro  };		
		Restangular.all('api/clienteUpdateNomeEmpreiteiro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarTelefoneEmpreiteiro1() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, telefone1_empreiteiro : $scope.cliente1.telefone1_empreiteiro  };		
		Restangular.all('api/clienteUpdateTelefone1Empreiteiro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarTelefoneEmpreiteiro2() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, telefone2_empreiteiro : $scope.cliente1.telefone2_empreiteiro  };		
		Restangular.all('api/clienteUpdateTelefone2Empreiteiro').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}	
	
	function editarObservacoes() {			
		var deffered  = $q.defer();	
		var params = {  id_cliente : $scope.cliente1.id, observacoes : $scope.cliente1.observacoes  };		
		Restangular.all('api/clienteUpdateObservacoes').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;		
	}
	
	function editarSenhaPerfil() {			
		var deffered  = $q.defer();	
		var params = {  id_login : $scope.cliente1.id_login, senha : $scope.cliente1.senha  };		
		Restangular.all('/api/perfilUpdateSenha').post(JSON.stringify(params)).then(function(espec) {					
			deffered.resolve(espec);			
		});
		return deffered.promise;
	}
	
	function pushMudancaStatusObra() {			
		var params = {   nome_cliente : $scope.cliente1.nome };		
		Restangular.all('/api/pushMudancaStatusObra').post(JSON.stringify(params)).then(function(espec) {					
			return espec;
		});	
	}	
		
	
	$scope.salvar = function (formClientes) {			
		$scope.submited = true;
		var promises = [];	
		console.log(formClientes);
		//Novo		
		if($state.params.novo){
			if(!formClientes.$invalid){				
				promises.push(salvarCliente());					
				$q.all(promises).then(function(retorno) {
					console.log(retorno);
					if(retorno[0].type===1){
						showErrorNotification(retorno[0].msg);
					}else{
						showNotification();	
						sendMail();					
						$state.go('clientes');							
					}			
				});			
			}				
		//Edicao
		}else{			
			if(!formClientes.$invalid){
				var mudancaStatusObra = false;
				if(formClientes.nome.$dirty){
					promises.push(editarNomeCliente());	
				}
				if(formClientes.sobrenome.$dirty){
					promises.push(editarSobrenomeCliente());	
				}
				
				if(formClientes.data_nascimento.$dirty){
					promises.push(editarDataNascimentoCliente());	
				}
				
				if(formClientes.telefone.$dirty){
					promises.push(editarTelefoneCliente());	
				}
				
				if(formClientes.celular.$dirty){
					promises.push(editarCelularCliente());	
				}
				
				if(formClientes.email.$dirty){
					promises.push(editarEmailCliente());	
				}
				
				if(formClientes.cep.$dirty){
					promises.push(editarCepCliente());	
				}	
				
				if(formClientes.endereco.$dirty){
					promises.push(editarEnderecoCliente());	
				}
				
				if(formClientes.bairro.$dirty){
					promises.push(editarBairroCliente());	
				}
				
				if(formClientes.numero.$dirty){
					promises.push(editarNumeroCliente());	
				}
				
				if(formClientes.cidade.$dirty){
					promises.push(editarCidadeCliente());	
				}
				
				if(formClientes.uf.$dirty){
					promises.push(editarUfCliente());	
				}			
				
				if(formClientes.fase1.$dirty){
					promises.push(editarFase1());	
					mudancaStatusObra = true;
				}
				
				if(formClientes.fase2.$dirty){
					promises.push(editarFase2());
					mudancaStatusObra = true;					
				}
				
				if(formClientes.fase3.$dirty){
					promises.push(editarFase3());	
					mudancaStatusObra = true;
				}
				
				if(formClientes.fase4.$dirty){
					promises.push(editarFase4());	
					mudancaStatusObra = true;
				}
				
				if(formClientes.fase5.$dirty){
					promises.push(editarFase5());	
					mudancaStatusObra = true;
				}
				
				if(formClientes.fase6.$dirty){
					promises.push(editarFase6());	
					mudancaStatusObra = true;
				}
				
				if(formClientes.fase7.$dirty){
					promises.push(editarFase7());
					mudancaStatusObra = true;
				}
				
				if(formClientes.fase8.$dirty){
					promises.push(editarFase8());
					mudancaStatusObra = true;					
				}
				
				if(formClientes.fase9.$dirty){
					promises.push(editarFase9());	
					mudancaStatusObra = true;
				}	
				
				promises.push(editarTipo($scope.cliente1.tipo));
				promises.push(editarTerrea($scope.cliente1.terrea));
						
				if(formClientes.nomeEspecificador.$dirty){
					promises.push(editarEspecificador());	
				}	
				
				if(formClientes.nomeEmpreiteiro.$dirty){
					promises.push(editarNomeEmpreiteiro());	
				}
				
				if(formClientes.telefoneEmpreiteiro1.$dirty){
					promises.push(editarTelefoneEmpreiteiro1());	
				}
				
				if(formClientes.telefoneEmpreiteiro2.$dirty){
					promises.push(editarTelefoneEmpreiteiro2());	
				}				
				
				if(formClientes.observacoes.$dirty){
					promises.push(editarObservacoes());	
				}	
				
				if(formClientes.senha.$dirty && formClientes.repetir_senha.$dirty){
					if($scope.cliente1.repetir_senha == $scope.cliente1.senha  ){
						promises.push(editarSenhaPerfil());	
					}else{
						var erro = {}
						erro.code = 'As senhas não são iguais';
						showErrorNotificationEditar(erro);
					}			
				}
				
				$q.all(promises).then(function(retorno) {
					console.log(retorno);
					if(retorno.length>0){
						if(retorno[0].type===1){
						showErrorNotificationEditar(retorno[0].msg);
						}else{
						if(mudancaStatusObra){
							pushMudancaStatusObra();		
						}
						showNotificationEditar();		
						$state.go('clientes');							
						}	
					}else{
						$state.go('clientes');	
					}							
				});			
			}			
		}
	};
	
	$scope.cancelar = function () {	
		$state.go('clientes');		
	};
	
	
	promisesInit.push(getAllEspecNoPoints());
	
	
	$q.all(promisesInit).then(function() {			
			init();		
		}	
	);
	
	
  });
  
