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
		this.wrapper = document.id(el);
		this.form = this.wrapper.get('tag') === 'form' ? this.wrapper : this.wrapper.getParent('form');
		this.spec = spec;

		var self = this;
		this.form.addEvent('submit', function(e){
			if (!self.isValid()) {
				e.preventDefault();
			}
		});

		Array.each(this.spec, function(group){
			new groupTypes[group.type](this.wrapper, group).attach();
		}, this);
	},

	/**
	 * Check if the form is valid, according to the supplied spec
	 */
	isValid: function(){
		return false;
	}
});

