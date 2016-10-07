(function(){
	'use strict';

	angular.module('myApp',['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
	.controller('RecipeController', RecipeController)
	.directive('addRecipe', addRecipe);

	function RecipeController($scope, $uibModal,$log){
		$scope.oneAtATime = true;
		var vm = this;
		vm.animationsEnabled = true;

		vm.recipes = [{
		
		title: 'Pumpkin pie',
		ingredients: ['Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']
		},{
			
		  title:'Spagetti',
		  ingredients: ['Noodles', 'Tomato Sauce', '(Optional) Meatballs']
		},
		{

		  title:'Onion Pie',
		  ingredients: ['Onion', 'Pie Crust', 'Sounds Yummy right?']
		}];

		  vm.edit = function () {
		    var modalInstance = $uibModal.open({
		      animation: vm.animationsEnabled,
		      ariaLabelledBy: 'modal-title',
		      ariaDescribedBy: 'modal-body',
		      templateUrl: 'myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		      controllerAs: 'vm',		      
		      resolve: {
		        recipe: function () {
		          return recipes;
		        }
		      }
		    });
		    
		  };
	};

	angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
	  var vm = this;
	  vm.recipes = items;
	  vm.selected = {
	    recipe: vm.recipes[0]
	  };

	  vm.ok = function () {
	    $uibModalInstance.close(vm.selected.recipe);
	  };

	  vm.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	});

	function addRecipe() {
			return {
				restrict: 'AE',
				scope: {},
				template: "<button class='btn btn-lg btn-primary' ng-click='vm.open()'>Add Recipes </button>",
				controller: ModalController,
				controllerAs: 'vm',
				// bindToController: true
			}
		}

		function ModalInstanceCtrl($scope, $uibModalInstance) {
			console.log('in');

		      $scope.cancel = function() {
		        $scope.$dismiss();
		      }

		      $scope.confirm = function() {
		        $scope.$close('some return value');
		      }
				}

			function ModalController($uibModal, $log , $scope) {
			var vm = this;
			$scope.animationsEnabled = true;

			$scope.open = open;

			this.open = function() {
				var modalInstance = $uibModel.open({
					animation: $scope.animationsEnabled,
					templateUrl: 'add-recipe.html',
					controller: ModalInstanceCtrl,
					size: 'lg'							
				});
				modalInstance.result.then(function(selectedItem) {
					console.log("Confirmed: "+ selectedItem);
					$scope.selectedItem = selectedItem;
				}, function() {
					$log.info('modal dismissed at: ' + new Date());
				});
			};
		}
})();


