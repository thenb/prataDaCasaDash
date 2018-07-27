'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('NotificacaoModalCtrl',  function ($scope, close, $q, Restangular, $window) {	
	$scope.notificacao = $scope.params.notificacao;	
	console.log($scope.notificacao );
	
	$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
	};
	
	$scope.goNoticia = function() {

		var url = $scope.notificacao.url;
		$window.location(url);
	};
	
	
	
  });
