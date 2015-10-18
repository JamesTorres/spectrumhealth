
app.directive('sidebar', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebar, function(newVal) {
				if(newVal)
				{
					element.addClass('show'); 
					// element.children().next().addClass('<');
					return;
				}
				element.removeClass('show');
            });
        }
	};
});

