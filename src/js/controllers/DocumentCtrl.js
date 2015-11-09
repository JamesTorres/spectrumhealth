app.controller('DocumentCtrl', DocumentCtrl);

function DocumentCtrl($scope) {
	// Necessary to implement theme switching via ng-href 
	$scope.theme = 'clean-cut';

	$scope.themeOptions = [
		{
			name: 'clean-cut', enabled: true
		},
		{
			name: 'hipster', enabled: false
		}
	];

}