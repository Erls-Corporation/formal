// author: Chiel Kunkels (@chielkunkels)
'use strict';

var Base = require('./base');

module.exports = new Class({
	Extends: Base,

	/**
	 * Build the field
	 */
	build: function(){
		var multiple = 'multiple' in this.spec && this.spec.multiple === true;

		this.li = new Element('li').adopt(
			this.label = new Element('label', {
				text: this.spec.label || null
			}),
			this.input = new Element('select', {
				name: this.spec.name ? this.spec.name+(multiple ? '[]' : '') : null,
				multiple: multiple
			})
		);

		if (typeOf(this.spec.options) === 'array') {
			var length = this.spec.options.length, i = 0, option;
			for (; i < length; i++) {
				option = this.spec.options[i];
				new Element('option', {
					text: option.label,
					value: option.value,
					selected: this.spec.defaultValue && this.spec.defaultValue === option.value
				}).inject(this.input);
			}
		}

		this.li.inject(this.root);

		if (typeOf(this.spec.dependencies) === 'object' && Object.keys(this.spec.dependencies).length) {
			this.activeGroups = [];
			this.input.addEvent('change', this.checkDependencies.bind(this));
			this.checkDependencies();
		}
	},

	/**
	 * Get the value of this field
	 */
	getValue: function(){
		return this.input.getElements(':selected').get('value');
	}
});

