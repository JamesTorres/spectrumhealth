app.controller('HeaderCtrl', HeaderCtrl);

function HeaderCtrl($scope) {

	$scope.about = {
		title: "About",
		dropdownItems: ['Dashboard', 'Logout']
	};

	$scope.homepage = {
		title: "Spectrum Statistics",
		dropdownItems: ['About', 'Logout']
	};

	$scope.login = {
		title: "Login",
		dropdownItems: ['About']
	};
}