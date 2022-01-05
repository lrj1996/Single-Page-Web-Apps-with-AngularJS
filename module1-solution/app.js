(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

//LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.result = "";
  $scope.fontcolor = "";
  $scope.check = function (items) {
    if ($scope.items.length == 0){
      $scope.result = "Please enter data first";
      $scope.fontcolor = "red";
    }
    else{
      $scope.fontcolor = "green";
      $scope.items = $scope.items.replace(/\s/g,"");
      var num = $scope.items.split(',').filter(item => item.length > 0).length;
      if (num > 3)
        $scope.result = "Too much!";
      else
        $scope.result = "Enjoy!";
    }
  };

}

})();
