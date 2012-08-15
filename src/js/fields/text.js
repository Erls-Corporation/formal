// author: Chiel Kunkels (@chielkunkels)
'use strict';

var Base = require('./base');

exports = module.exports = new Class({
	Extends: Base,

	/**
	 * Build the field
	 */
	build: function(){
		this.li = new Element('li').adopt(
			this.label = new Element('label', {
				text: this.spec.label || null
			}),
			this.input = new Element('input', {
				value: this.spec.defaultValue || null,
				name: this.spec.name || null
			})
		);

		if (this.spec.required && this.spec.required === true) {
			this.input.set('required', '');
		}

		if (this.spec.validator && typeOf(this.spec.validator) === 'object') {
			this.input.set('pattern', this.spec.validator.regex);
			this.input.set('title', this.spec.validator.pattern);
		}

		this.li.inject(this.root);

		if (this.spec.dependencies && Object.keys(this.spec.dependencies).length) {
			this.activeGroups = [];
			this.input.addEvent('input', this.checkDependencies.bind(this));
			this.checkDependencies();
		}
	}
});
