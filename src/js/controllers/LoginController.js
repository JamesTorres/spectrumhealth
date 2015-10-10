app.controller('LoginController', ['$scope', function($scope) { 
  $scope.title = 'Spectrum Statistics';
  $scope.change = function() {
    $scope.title = 'Testing functions';
  }
}]);