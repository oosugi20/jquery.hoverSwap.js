/*!
 * jquery.hoverSwap.js
 * @dependent jquery.js, imageSwap.js
 * @author oosugi20@gmail.com
 */
;(function ($, window, undefined) {
	'use strict';

	var PLUGIN_NAME
	  , ImageSwap = window.ImageSwap 
	  ;

	/**
	 * PLUGIN_NAME
	 * このプラグインの名前。
	 * jQueryのメソッド名となる。
	 * @type String
	 * @static
	 */
	PLUGIN_NAME = 'hoverSwap';


	/**
	 * append $.fn
	 * @public
	 * @return {jQuery object}
	 */
	$.fn[PLUGIN_NAME] = function (options) {
		return this.each(function () {
			var _this = this
			  , create
			  ;

			/**
			 * create
			 * @private
			 * @type Function
			 */
			create = function () {
				$.data(_this, PLUGIN_NAME, new ImageSwap(_this, options));

				$(_this).on('mouseenter', function () {
					if ($(this).attr('src') === $.data(this, PLUGIN_NAME).normal_src) {
						$.data(this, PLUGIN_NAME).swapTo('over');
						$(this).on('mouseleave', function () {
							$.data(this, PLUGIN_NAME).swapTo('normal');
						});
					}
				});
			};

			if (!$.data(this, PLUGIN_NAME)) {
				create();
			} else {
				if ($.data(this, PLUGIN_NAME).normal_src !== $(this).attr('src')) {
					create();
				}
			}
		});
	};

})(jQuery, this);
