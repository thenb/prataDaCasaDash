'use strict';

/**
 * @ngdoc function
 * @name prataAngularApp.controller:EspecificadoresCtrl
 * @description
 * # EspecificadoresCtrl
 * Controller of the prataAngularApp
 */
angular.module('prataAngularApp')
  .controller('registroPontuacaoModalCtrl',  function ($scope, close, $q, Restangular) {	
	
	var promises = [];	
	
	$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
	};
	
	function init() {			
			console.log('especificadores');
			console.log($scope.especificadores);			
	}
	
	function getAllPontosById() {			
		var deffered  = $q.defer();		
		Restangular.one('getAllEspec').getList().then(function(users) {
			console.log(users);
			$scope.especificadores = users;
			deffered.resolve(users);
		});
		return deffered.promise;
	}
	
	promises.push(getAllPontosById());
	
	
	$q.all(promises).then(
		function() {
			init();		
		}	
	);
	
  });
