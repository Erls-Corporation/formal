// author: Chiel Kunkels (@chielkunkels)

var Base = require('./base');

module.exports = new Class({
	Extends: Base,
	/**
	 * Create a new field
	 * @param {Element} wrapper Parent element to inject into
	 * @param {Object} spec Specification of the field
	 */
	initialize: function(wrapper, spec){
		this.wrapper = wrapper;
		this.spec = spec;

		this.li = new Element('li').adopt(
			this.label = new Element('label', {
				text: this.spec.label || null
			}),
			this.input = new Element('input', {
				value: this.spec.defaultValue || null,
				name: this.spec.name || null
			})
		).inject(wrapper);

		if (this.spec.dependancies && Object.keys(this.spec.dependancies).length) {
			this.activeGroups = [];
			this.input.addEvent('input', this.checkDependancies.bind(this));
			this.checkDependancies();
		}
	}
});
