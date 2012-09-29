/*!
 * imageSwap.js
 */
;(function ($, window, undefined) {
	'use strict';

	var  default_options
	  , ImageSwap 
	  ;


	/**
	 * default_options
	 * @type Object
	 * @static
	 */
	default_options = {
	    over_suffix: '_ov'
	  , normal_suffix: ''
	};


	/**
	 * ImageSwap
	 * @constructor
	 * @param {HTMLElement} element
	 * @param {Object} options
	 * @return {Instance object}
	 */
	ImageSwap = function (element, options) {
		this.el = element;
		this.$el = $(element);
		this.options = $.extend({}, default_options, options);
		this.init();
		return this;
	};


	// defines `fn` as shortcut of `prototype`
	ImageSwap.prototype = ImageSwap.fn = {};


	/**
	 * ImageSwap.fn.init
	 * @type Function
	 * @chainable
	 */
	ImageSwap.fn.init = function () {
		this
			._setSrcExtention()
			._setNormalSrc()
			._setOverSrc()
			._preloadOver()
			;
		//console.log(this);
	};


	/**
	 * ImageSwap.fn._setImageExtention
	 * 画像の拡張子をプロパティにセットする。
	 * @private
	 * @type Function
	 * @chainable
	 */
	ImageSwap.fn._setSrcExtention = function () {
		var src = this.$el.attr('src')
		  , dot = src.lastIndexOf('.')
		  , extention = src.slice(dot);
		  ;

		this.src_extention = extention;
		return this;
	};


	/**
	 * ImageSwap.fn.isOverSrc
	 * オーバー時のパスかどうかを判別する。
	 * 引数が渡されなかった場合は、現在のsrcから判別する。
	 * @type Function
	 * @param {Strng} [src]
	 * @return Boolean
	 */
	ImageSwap.fn.isOverSrc = function (src) {
		var src = src || this.$el.attr('src')
		  , reg = new RegExp(this.options.over_suffix + this.src_extention + '$', 'i')
		  ;
		return reg.test(src);
	};


	/**
	 * ImageSwap.fn._setNormalSrc
	 * 通常時の画像パスをプロパティにセットする。
	 * @private
	 * @type Function
	 * @chainable
	 */
	ImageSwap.fn._setNormalSrc = function () {
		var src = this.$el.attr('src')
		  , reg = new RegExp(this.options.over_suffix + this.src_extention + '$', 'i')
		  ;

		// 初期状態がオーバー時の画像だった場合は、
		// オーバー用の接尾辞を取り除く
		if (this.isOverSrc(src)) {
			src = src.replace(reg, this.options.normal_suffix + this.src_extention);
		}

		this.normal_src = src;

		return this;
	};


	/**
	 * ImageSwap.fn.noExtentionSrc
	 * 拡張子を除いたパスを返す。
	 * @type Function
	 * @param {String} src
	 * @return {String}
	 */
	ImageSwap.fn.noExtentionSrc = function (src) {
		return src.replace(this.src_extention, '');
	};


	/**
	 * ImageSwap.fn._setOverSrc
	 * オーバー時の画像パスを取得し、プロパティにセットする。
	 * @private
	 * @type Function
	 * @chainable
	 */
	ImageSwap.fn._setOverSrc = function () {
		var _src = this.noExtentionSrc(this.normal_src);
		this.over_src = _src + this.options.over_suffix + this.src_extention;
		return this;
	};


	/**
	 * ImageSwap.fn.swapTo
	 * @type Function
	 * @param {String} contenxt `over|normal`
	 * @chainable
	 */
	ImageSwap.fn.swapTo = function (context) {
		switch (context) {
			case 'over':
				this._swapOver();
				break;

			case 'normal':
				this._swapNormal();
				break;

			//case 'current':
		}
		return this;
	};


	/**
	 * ImageSwap.fn._swapOver
	 */
	ImageSwap.fn._swapOver = function () {
		this.$el.attr('src', this.over_src);
		return this;
	};


	/**
	 * ImageSwap.fn.swapNormal
	 */
	ImageSwap.fn._swapNormal = function () {
		this.$el.attr('src', this.normal_src);
		return this;
	};


	/**
	 * ImageSwap.fn._preloadOver
	 */
	ImageSwap.fn._preloadOver = function () {
		(new Image()).src = this.over_src;
		return this;
	};


	// set global
	window.ImageSwap = ImageSwap;

})(jQuery, this);
