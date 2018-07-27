'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('AceiteModalCtrl',  function ($scope, close, $window) {	
	
	console.log('entrou');
	
	$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
	};
	
	$scope.sair = function () {		
		$window.location.href = 'index.html';
	};
	
	
	
  });
