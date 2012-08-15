// author: Chiel Kunkels (@chielkunkels)
'use strict';

exports = module.exports = new Class({
	/**
	 * Create a new element group
	 * @param {Element} root Parent element to inject into
	 * @param {Object} spec Specification of the group
	 */
	initialize: function(root, spec){
		this.root = root;
		this.spec = spec;
		this.build();
	},

	/**
	 * Remove the group from the DOM
	 */
	detach: function(){
		this.group.dispose();
	},

	/**
	 * Inject the group into the DOM
	 */
	attach: function(){
		this.group.inject(this.root);
	},

	/**
	 * Remove a group from the dom
	 */
	destroy: function(){
		this.group.destroy();
	}
});

