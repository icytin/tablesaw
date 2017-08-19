var tableSawHandler = function() {
	
	var _setResponsive = function(state) {
		var priorityClass = "tablesaw-priority-";
		if(state === true) {
			_adjust('_' + priorityClass, priorityClass);
		}
		else { // Make columns persistent
			_adjust(priorityClass, '_' + priorityClass);
		}
	};
	
	var _adjust = function(find, replace) {
		$.each($('table.tablesaw thead tr th[class*="' + find + '"]'), function() {
			_updateClass($(this), find, replace);
		});
		
		$.each($('table.tablesaw tbody tr td[class*="' + find + '"]'), function() {
			_updateClass($(this), find, replace);
		});
	}
	
	var _updateClass = function($el, find, replace) {
		var attrClass = $el.attr("class");
		attrClass = attrClass.replace(find, replace);
		$el.attr("class", attrClass);
	};
	
	return {
		setResponsive: _setResponsive
	};
	
}(jQuery);

var printHandler = function() {
	
	/* Initialize the print dialog.
	* Actions:
	* # Fix if page contains the responsive tableSaw plugin
	*/
	var _printPage = function() {
		tableSawHandler.setResponsive(false);
		print();
		setTimeout(function () {
			tableSawHandler.setResponsive(true)
		}, 300);
	};
	
	return {
		printPage: _printPage
	};
	
}(jQuery);


/// TEST Usage of code above.. 
/// This makes a tablesaw plugin non-responsive just before the print dialog opens.. afterwards it goes back to responsive mode again.
/// Otherwise some columns may disappear in the print view.
$(document).ready(function() {
	printHandler.printPage();
});