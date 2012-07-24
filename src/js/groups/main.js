// author: Chiel Kunkels (@chielkunkels)

var fieldTypes = require('./../fieldtypes');

module.exports = new Class({
	/**
	 * Create a new element group
	 * @param {Element} wrapper Parent element to inject into
	 * @param {Object} spec Specification of the group
	 */
	initialize: function(wrapper, spec){
		this.wrapper = wrapper;
		this.spec = spec;

		this.fieldset = new Element('fieldset.group').adopt(
			this.list = new Element('ul')
		).inject(this.wrapper);

		if (this.spec.title) {
			this.legend = new Element('legend', {
				text: this.spec.title
			}).inject(this.fieldset, 'top');
		}

		Array.each(this.spec.elements, function(field){
			new fieldTypes[field.type](this.list, field);
		}, this);
	},

	/**
	 * Remove a group from the dom
	 */
	destroy: function(){
		this.fieldset.destroy();
	}
});

