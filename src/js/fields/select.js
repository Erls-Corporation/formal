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
			this.input = new Element('select', {
				name: this.spec.name || null
			})
		);

		if (typeOf(this.spec.options) === 'array') {
			var length = this.spec.options.length, i = 0, options;
			for (; i < length; i++) {
				option = this.spec.options[i];
				new Element('option', {
					text: option.label,
					value: option.value
				}).inject(this.input);
			}
		}

		this.li.inject(wrapper);

		if (typeOf(this.spec.dependancies) === 'object' && Object.keys(this.spec.dependancies).length) {
			this.activeGroups = [];
			this.input.addEvent('change', this.checkDependancies.bind(this));
			this.checkDependancies();
		}
	}
});
