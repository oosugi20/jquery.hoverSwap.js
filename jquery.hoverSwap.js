/*!
 * jquery.hoverSwap.js
 * @dependent jquery.js
 * @author oosugi20@gmail.com
 */
;(function ($, window, undefined) {
	'use strict';

	var PLUGIN_NAME
	  , default_options
	  , HoverSwap 
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
	 * default_options
	 * @type Object
	 * @static
	 */
	default_options = {
	    over_suffix: '_ov'
	  , normal_suffix: null
	};


	/**
	 * HoverSwap
	 * @constructor
	 * @param {HTMLElement} element
	 * @param {Object} options
	 * @return {Instance object}
	 */
	HoverSwap = function (element, options) {
		this.el = element;
		this.$el = $(element);
		this.options = $.extend({}, default_options, options);
		this.init();
		return this;
	};


	// defines `fn` as shortcut of `prototype`
	HoverSwap.prototype = HoverSwap.fn = {};


	/**
	 * HoverSwap.fn.init
	 * @type Function
	 * @chainable
	 */
	HoverSwap.fn.init = function () {
		this
			._setSrcExtention()
			._setNormalSrc()
			;
		//console.log(this);
	};


	/**
	 * HoverSwap.fn._setImageExtention
	 * 画像の拡張子をプロパティにセットする。
	 * @private
	 * @type Function
	 * @chainable
	 */
	HoverSwap.fn._setSrcExtention = function () {
		var src = this.$el.attr('src')
		  , dot = src.lastIndexOf('.')
		  , extention = src.slice(dot);
		  ;

		this.src_extention = extention;
		return this;
	};


	/**
	 * HoverSwap.fn.isOverSrc
	 * オーバー時のパスかどうかを判別する。
	 * 引数が渡されなかった場合は、現在のsrcから判別する。
	 * @type Function
	 * @param {Strng} [src]
	 * @return Boolean
	 */
	HoverSwap.fn.isOverSrc = function (src) {
		var src = src || this.$el.attr('src')
		  , reg = new RegExp(this.options.over_suffix + this.src_extention + '$', 'i')
		  ;
		return reg.test(src);
	};


	/**
	 * HoverSwap.fn._setNormalSrc
	 * 通常時の画像パスをプロパティにセットする。
	 * @private
	 * @type Function
	 * @chainable
	 */
	HoverSwap.fn._setNormalSrc = function () {
		var _this = this
		  , o = _this.options
		  , src = _this.$el.attr('src')
		  , reg = new RegExp('_ov' + this.src_extention + '$', 'i')
		  ;

		// 初期状態がオーバー時の画像だった場合は、
		// オーバー用の接尾辞を取り除く
		if (this.isOverSrc(src)) {
			src = src.replace(reg, this.src_extention);
		}

		_this.normal_src = src;

		return this;
	};


	/**
	 * HoverSwap.fn._setOverSrc
	 * オーバー時の画像パスを取得し、プロパティにセットする。
	 * @private
	 * @type Function
	 * @chainable
	 */
	HoverSwap.fn._setOverSrc = function () {
		var _this = this;

	};


	/**
	 * append $.fn
	 * @public
	 * @return {jQuery object}
	 */
	$.fn[PLUGIN_NAME] = function (options) {
		return this.each(function () {
			if (!$.data(this, PLUGIN_NAME)) {
				$(this).data(PLUGIN_NAME, new HoverSwap(this, options));
			}
		});
	};

})(jQuery, this);
