// author Chiel Kunkels (@chielkunkels)
'use strict';

exports = module.exports = new Class({
	/**
	 * Create a new page
	 * @param {Element} root Element to build the page in
	 * @param {Object} spec Spec to build the page to
	 */
	initialize: function(root, spec){
		this.root = root;
		this.spec = spec;
		this.build();
	},

	/**
	 * Show the page
	 */
	show: function(){
		this.page.setStyle('display', 'block');
	},

	/**
	 * Hide the page
	 */
	hide: function(){
		this.page.setStyle('display', 'none');
	}
});

