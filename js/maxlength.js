/*
 *  Project: Maxlength Paster lite
 *  Description: Handles pasting of text into input fields with a maxlength
 *  Author: Nick Lockhart
 *  License: To Kill
 */

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "paster",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
        	//bind event
        	this.element.onpaste = function(e){
        		if (e.clipboardData && e.clipboardData.types) {
        			//clean data
        			var clipboardval = e.clipboardData.getData("text/plain").replace('/\D\s/g', "").split('')
    				Plugin.prototype.pasteEvent($(this), clipboardval);
        		}
        	}	
        },
        pasteEvent: function(pastedelement, pastevalue)
        {
        	var maxlength_fields = pastedelement.find('input[maxlength]'),
        		pasteddata = pastevalue,
	        	maxindex = pasteddata.length;
	        	
	       	maxlength_fields.val('');
			valueindex = 0;
    		for (var i = 0; i < maxlength_fields.length; i++) {
    			activefield = $(maxlength_fields[i]);

        		while(activefield.val().length < activefield.attr('maxlength') && (valueindex < maxindex)){
        			activefield.val(activefield.val()+pasteddata[valueindex])
        			valueindex++
        		}

        	}
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );