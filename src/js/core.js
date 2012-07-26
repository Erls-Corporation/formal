// author: Chiel Kunkels (@chielkunkels)

var groupTypes = require('./grouptypes');

module.exports = new Class({

	Implements: Events,

	/**
	 * Instantiate a new form
	 * @param {Element} el Form element to build the form in
	 * @param {Object} spec Specification of how the form should look
	 */
	initialize: function(el, spec){
		this.form = document.id(el);
		this.spec = spec;

		Array.each(this.spec, function(group){
			new groupTypes[group.type](this.form, group).attach();
		}, this);
	}
});

