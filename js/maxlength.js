/*
 *  Project: Maxlength Paster lite
 *  Description: Handles pasting of text into input fields with a maxlength
 *  Author: Nick Lockhart
 *  License: To Kill
 */

;(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "paster",
        defaults = {
            onlyInt: true //By default strip non-int characters
        };

    // The plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options); // Merge options with the defaults
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var onlyInt = this.options.onlyInt;

            this.element.onpaste = function(e) {
                if (e.clipboardData && e.clipboardData.types) {
                    var clipboardValue = e.clipboardData.getData("text/plain"); //Get the clipboard data

                    if (onlyInt) {
                        clipboardValue = clipboardValue.replace(/\D/g, ""); //Remove all non-int
                    }

                    clipboardValue.split('');

                    Plugin.prototype.pasteEvent($(this), clipboardValue);
                }
            }
        },
        pasteEvent: function(pastedelement, pasteValue) {
            var targetField = pastedelement.find('input[maxlength]'), //Target fields to insert into
                pastedData = pasteValue, //The clipboard data to be inserted
                maxIndex = pastedData.length, //Length of clipboard data to be inserted
                valuePosition = 0; //The position within the maxlength fields

            targetField.val(''); //Clear the target fields before inserting
            for (var i = 0; i < targetField.length; i++) {
                activefield = $(targetField[i]); //Current input

                //Fill up the input while it still has space based on the maxlength attribute
                while (activefield.val().length < activefield.attr('maxlength') && (valuePosition < maxIndex)) {
                    activefield.val(activefield.val() + pastedData[valuePosition]);
                    valuePosition++;
                }

            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);