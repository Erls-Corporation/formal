// author: Chiel Kunkels (@chielkunkels)
'use strict';

var Base = require('./base'),
	fields = require('./../fields');

exports = module.exports = new Class({
	Extends: Base,

	/**
	 * Build up the group
	 */
	build: function(){
		this.group = new Element('fieldset.group').adopt(
			this.list = new Element('ul')
		);

		if (this.spec.title) {
			this.legend = new Element('legend', {
				text: this.spec.title
			}).inject(this.group, 'top');
		}

		Array.each(this.spec.fields, function(field){
			try {
				new (fields.fetch(field.type))(this.list, field);
			} catch (e) {
				console.warn(e.message);
				return;
			}
		}, this);
	}
});

