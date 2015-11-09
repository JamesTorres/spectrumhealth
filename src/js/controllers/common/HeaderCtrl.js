app.controller('HeaderCtrl', HeaderCtrl);

function HeaderCtrl($scope) {

	$scope.about = {
		title: "About",
		dropdownItems: ['About', 'Homepage', 'Logout'],
		selected: 0,
		signedInText: "Signed in as C. P. Bean"
	};

	$scope.homepage = {
		title: "Spectrum Statistics",
		dropdownItems: ['About', 'Homepage', 'Logout'],
		selected: 1,
		signedInText: "Signed in as C. P. Bean"
	};

	$scope.login = {
		title: "Login"
	};
}