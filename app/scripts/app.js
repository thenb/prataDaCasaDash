'use strict';

/**
 * @ngdoc overview
 * @name prataAngularApp
 * @description
 * # prataAngularApp
 *
 * Main module of the application.
 */
var app = angular
  .module('prataAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'restangular',
	'ngTable',	
	'angularModalService',
	'ngMask',
	'ui.router',
	'ui.bootstrap',
	'ui-notification',
	'angularMoment',
	'ngLoadingSpinner',
	'angucomplete-alt',
	'multipleSelect',
	'ui.utils.masks'

  ])
  
  
	//valida as tokens no http
	app.factory('authInterceptor', function ($rootScope, $window, $q) {
		 return {
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.localStorage['token']) {					
					config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
				}
				return config;
			},
			response: function (response) {
				return response || $q.when(response);
			},
			responseError: function (response) {
				if (response.status === 401) {
					$window.location.href = 'index.html';
				}
				return $q.reject(response);
			}
		};
		
	})	
	
	app.directive('fileUpload', function () {
		return {
			scope: true,        //create a new scope
			link: function (scope, el, attrs) {
				el.bind('change', function (event) {
					var files = event.target.files;
					//iterate files since 'multiple' may be specified on the element
					//for (var i = 0;i<files.length;i++) {
						//emit event upward
						scope.$emit("fileSelected", { file: files });
					//}                                       
				});
			}
		};
	})  
  
  
  
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $routeProvider, NotificationProvider, $httpProvider   ) {
     
	 
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 10,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });	 	
	
	
	$httpProvider.interceptors.push('authInterceptor');

	$urlRouterProvider.otherwise('/dashboard');
	 
	$stateProvider    
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl',
		controllerAs: 'dashboard'
    })
	.state('especificadores', {
		url: '/especificadores',
		templateUrl: 'views/especificadores.html',
		controller: 'EspecificadoresCtrl',
		controllerAs: 'especificadores'
    })	
	.state('especificador', {
		url: '/especificador',
		templateUrl: 'views/especificador.html',
		controller: 'EspecificadorCtrl',
		controllerAs: 'especificador',
		params: {novo: null, espec: null, aprovar: null, view: null, edit: null }		
    })
	.state('aprovarEspec', {
        url: '/aprovarEspec',
		templateUrl: 'views/aprovarespecificador.html',
        controller: 'AprovarespecificadorCtrl',
        controllerAs: 'aprovarespecificador'
    })
	.state('empresas', {
        url: '/empresas',
		templateUrl: 'views/empresas.html',
        controller: 'EmpresasCtrl',
        controllerAs: 'empresas'
    })
	.state('pontuacao', {
        url: '/pontuacao',
		templateUrl: 'views/pontuacao.html',
        controller: 'PontuacaoCtrl',
        controllerAs: 'pontuacao'
    })
	.state('campanhas', {	 
		url: '/campanhas',
		templateUrl: 'views/campanhas.html',
		controller: 'CampanhasCtrl',
		controllerAs: 'campanhas'
    })
	.state('empresa', {	 
		url: '/empresa',
		templateUrl: 'views/empresa.html',
		controller: 'EmpresaCtrl',
		controllerAs: 'empresa',
		params: {novo: null, empre: null, view: null, edit: null }
	})
	.state('campanha', {	 
		url: '/campanha',
		templateUrl: 'views/campanha.html',
		controller: 'CampanhaCtrl',
		controllerAs: 'campanha',
		params: {novo: null, campanha: null }
	})
	.state('perfil', {	 
		url: '/perfil',
		templateUrl: 'views/perfil.html',
		controller: 'PerfilCtrl',
		controllerAs: 'perfil'
	})
	.state('visitas', {	 
		url: '/visitas',
		templateUrl: 'views/visitas.html',
		controller: 'VisitasCtrl',
		controllerAs: 'visitas'
	})
	.state('minhasvisitas', {	 
		url: '/minhasvisitas',
		templateUrl: 'views/minhasvisitas.html',
		controller: 'VisitasCtrl',
		controllerAs: 'visitas'
	})
	.state('novaPontuacao', {	 
		url: '/novaPontuacao',
		cache: false,
		templateUrl: 'views/novapontuacao.html',
		controller: 'NovapontuacaoCtrl',
		controllerAs: 'novaPontuacao'
	})
	.state('clientes', {	 
		url: '/clientes',
		templateUrl: 'views/clientes.html',
		controller: 'ClientesCtrl',
		controllerAs: 'clientes'
	})
	.state('cliente', {	 
		url: '/cliente',
		templateUrl: 'views/cliente.html',
		controller: 'ClienteCtrl',
		controllerAs: 'cliente',
		params: {novo: null, cliente: null, view: null, edit: null }
	})
	.state('presencas', {	 
		url: '/presencas',
		templateUrl: 'views/presencas.html',
		controller: 'PresencasCtrl',
		controllerAs: 'presencas'
	})
	.state('premios', {	 
		url: '/premios',
		templateUrl: 'views/premios.html',
		controller: 'PremiosCtrl',
		controllerAs: 'premios'
	})
	.state('premio', {
		url: '/premio',
		templateUrl: 'views/premio.html',
		controller: 'PremioCtrl',
		controllerAs: 'premio',
		params: {novo: null, premio: null, view: null }
	})
	.state('visitageral', {
		url: '/visitageral',
		templateUrl: 'views/visitageral.html',
		controller: 'VisitageralCtrl',
		controllerAs: 'visitageral'
	})
	.state('notificacoes', {
		url: '/notificacoes',
		templateUrl: 'views/notificacoes.html',
		controller: 'NotificacoesCtrl',
		controllerAs: 'notificacoes'		
	});
	
	
	
	$routeProvider      
	.when('/dashboard', {
		templateUrl: 'views/dashboard.html',
		controller: 'DashboardCtrl',
		controllerAs: 'dashboard'		
	})	  
	.when('/especificadores', {
		templateUrl: 'views/especificadores.html',
		controller: 'EspecificadoresCtrl',
		controllerAs: 'especificadores'		
	})
	.when('/especificador', {
		templateUrl: 'views/especificador.html',
		controller: 'EspecificadorCtrl',
		controllerAs: 'especificador'
	})	  
	.when('/aprovarEspec', {
		templateUrl: 'views/aprovarespecificador.html',
		controller: 'AprovarespecificadorCtrl',
		controllerAs: 'aprovarespecificador'
	})
	.when('/empresas', {
		templateUrl: 'views/empresas.html',
		controller: 'EmpresasCtrl',
		controllerAs: 'empresas'
	})
	.when('/pontuacao', {
		templateUrl: 'views/pontuacao.html'		
	})
	.when('/campanhas', {
		templateUrl: 'views/campanhas.html',
		controller: 'CampanhasCtrl',
		controllerAs: 'campanhas'
	})
	.when('/empresa', {
		templateUrl: 'views/empresa.html',
		controller: 'EmpresaCtrl',
		controllerAs: 'empresa'
		})
	.when('/campanha', {
		templateUrl: 'views/campanha.html',
		controller: 'CampanhaCtrl',
		controllerAs: 'campanha'
	})
	.when('/perfil', {
		templateUrl: 'views/perfil.html'
	})
	.when('/visitas', {
		templateUrl: 'views/visitas.html',
		controller: 'VisitasCtrl',
		controllerAs: 'visitas'
	})
	.when('/minhasvisitas', {
		templateUrl: 'views/minhasvisitas.html',
		controller: 'VisitasCtrl',
		controllerAs: 'visitas'
	})
	.when('/novaPontuacao', {	
		templateUrl: 'views/novapontuacao.html',
		controller: 'NovaPontuacaoCtrl',
		controllerAs: 'novaPontuacao'
	})
	.when('/clientes', {	
		templateUrl: 'views/clientes.html',
		controller: 'ClientesCtrl',
		controllerAs: 'clientes'
	})
	.when('/cliente', {	
		templateUrl: 'views/cliente.html',
		controller: 'ClienteCtrl',
		controllerAs: 'cliente'
	})
	.when('/presencas', {
	  templateUrl: 'views/presencas.html',
	  controller: 'PresencasCtrl',
	  controllerAs: 'presencas'
	})
	.when('/premios', {
	  templateUrl: 'views/premios.html',
	  controller: 'PremiosCtrl',
	  controllerAs: 'premios'
	})
	.when('/premio', {
	  templateUrl: 'views/premio.html',
	  controller: 'PremioCtrl',
	  controllerAs: 'premio'
	})
	.when('/visitageral', {		
		templateUrl: 'views/visitageral.html',
		controller: 'VisitageralCtrl',
		controllerAs: 'visitageral'
	})
	.when('/notificacoes', {		
		templateUrl: 'views/notificacoes.html',
		controller: 'NotificacoesCtrl',
		controllerAs: 'notificacoes'
	})
	
	
	;	
	
	RestangularProvider.setBaseUrl('https://prata.herokuapp.com/');
	//RestangularProvider.setBaseUrl('http://web.eusoupratadacasa.com.br:9002/');
	//RestangularProvider.setBaseUrl('http://ec2-18-231-183-60.sa-east-1.compute.amazonaws.com:9002/');
	
	
      
  });
