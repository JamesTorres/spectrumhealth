app.controller('SidebarCtrl', SidebarCtrl);

function SidebarCtrl($scope, localStorage) {
	/*
		Sidebar contains preferences:
			- API's to use
			- Filters for setting good/bad points/markers
			- Model variables to change the statistics model
			- Theme

        These preferences are saved to localStorage on change, and loaded each refresh.
	*/

    // State of the sidebar (closed = false)
    $scope.state = false;
    $scope.icon = ">";
    
    // Function to open and close the sidebar using the sidebar directive and $watch
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
        $scope.icon = ($scope.icon == ">") ? "<" : ">";
    };

    // Currently selected preference in the sidebar pane
    $scope.selected = null;

    // Our preferences array 
    $scope.sidebarPreferences = [
        {
            name: "API Selection",
            options: [
                { name: "SH Endpoint", enabled: true }, 
                { name: "Weather Channel", enabled: true }, 
                { name: "Flu Data", enabled: false }
            ]
        }, {
            name: "Filters",
            options: [
                { name: "Waiting/Total Ratio", value: 0.5 },
                { name: "Seen/Total Ratio", value: 0.5 },
                { name: "Waiting/Provider Ratio", value: 0.5 }
            ]
        }, {
            name: "Model",
            options: [
                { name: "# Providers for Day", value: 10, day: null },        // TODO
                { name: "Hours of Operation", value: 11, day: null }              // Implement object for a days statistcs?
            ]
        }, {
            name: "Theme",
            options: [
                { name: "Clean-cut", enabled: true }
            ]
        }
    ];

    // Selects a preference to edit
    $scope.select = function(preferenceObject) {
        $scope.selected = preferenceObject;
    };

    // Enables an API for use
    $scope.enableAPI = function(option) {
        option.enabled = (option.enabled) ? false : true;
        //callToBackend();
        //reloadPage();
        $scope.savePreferences();
    };

    $scope.changeFilter = function(option) {
        // Talk to backend
        $scope.savePreferences();
    };

    $scope.changeModel = function(option) {
        // Talk to backend
        $scope.savePreferences();
    };

    $scope.changeTheme = function(option) {
        // Change themeing somehow...
        $scope.savePreferences();
    };

    // Saves preferences to localStorage
    $scope.savePreferences = function() {
        localStorage.setObject('sidebarPreferences', $scope.sidebarPreferences);
    };

    // Loads preferences from localStorage (using service "storage")
    $scope.loadPreferences = function(){
        // If we have preferences in localStorage, get them
        if (localStorage.getObject('sidebarPreferences') !== null) {
            $scope.sidebarPreferences = localStorage.getObject('sidebarPreferences');
        }
    };

    // Clears any stored data from localStorage
    $scope.clearPreferences = function() {
        localStorage.clear();
    };

    $scope.loadPreferences();
}