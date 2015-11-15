app.controller('SidebarCtrl', SidebarCtrl);

function SidebarCtrl($scope, localStorage, UrgentCares) {
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
            name: "Data Sources",
            options: [
                { name: "Spectrum Health", enabled: true }, 
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
        } , {
            name: "Settings",
            options: [
                { name: "Show Empty Points", enabled: UrgentCares.showEmptyPoints },
                { name: "Simple Mode", enabled: UrgentCares.simpleMode }
            ]
        }, {
            name: "Theme",
            options: [
                { name: "Clean-cut", enabled: true }
            ]
        }, {
            name: "Urgent Cares",
            options: [
                { name: UrgentCares.alpine.key, enabled: UrgentCares.alpine.enabled },        // TODO
                { name: UrgentCares.broadmoor.key, enabled: UrgentCares.broadmoor.enabled },              // Implement object for a days statistcs?
                { name: UrgentCares.eastBeltline.key, enabled: UrgentCares.eastBeltline.enabled },
                { name: UrgentCares.westPavilion.key, enabled: UrgentCares.westPavilion.enabled }
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

    // Enables display of data for a UC 
    $scope.enableUC = function(option) {
        option.enabled = (option.enabled) ? false : true;
        if (UrgentCares.changeSelected($scope.sidebarPreferences[4].options)) {
            $scope.savePreferences();
        }
    };

    $scope.enableSetting = function(option) {
        option.enabled = (option.enabled) ? false : true;

        switch (option.name) {
            case $scope.sidebarPreferences[2].options[0].name:
                UrgentCares.changeShowEmptyPoints(option.enabled);
                break;
            case $scope.sidebarPreferences[2].options[1].name:
                UrgentCares.changeSimpleMode(option.enabled);
                break;
            default:
                break;
        }
        
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

            // Update our models
            UrgentCares.changeSelected($scope.sidebarPreferences[4].options);
            UrgentCares.changeShowEmptyPoints($scope.sidebarPreferences[2].options[0].enabled);
            UrgentCares.changeSimpleMode($scope.sidebarPreferences[2].options[1].enabled);
        }
    };

    // Clears any stored data from localStorage
    $scope.clearPreferences = function() {
        localStorage.clear();
    };

    // $scope.clearPreferences();      // UNCOMMENT ME SOMEDAY!!
    $scope.loadPreferences();
}