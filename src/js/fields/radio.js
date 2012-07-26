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
			this.fieldset = new Element('fieldset.radiobuttons').adopt(
				this.list = new Element('ul')
			)
		);

		this.inputs = $$();

		if (typeOf(this.spec.options) === 'array') {
			var length = this.spec.options.length, i = 0, options, input;
			for (; i < length; i++) {
				option = this.spec.options[i];
				new Element('li').adopt(
					input = new Element('input', {
						type: 'radio',
						name: this.spec.name,
						value: option.value,
						checked: this.spec.defaultValue && this.spec.defaultValue === option.value
					}),
					new Element('label', {
						text: option.label
					})
				).inject(this.list);
				this.inputs.push(input);
			}
		}

		this.li.inject(wrapper);

		if (typeOf(this.spec.dependancies) === 'object' && Object.keys(this.spec.dependancies).length) {
			this.activeGroups = [];
			this.inputs.addEvent('change', this.checkDependancies.bind(this));
			this.checkDependancies();
		}
	},

	/**
	 * Get the value of this field
	 */
	getValue: function(){
		var checked = this.inputs.filter(':checked');
		if (checked.length) {
			return checked[0].get('value');
		}
	}
});

