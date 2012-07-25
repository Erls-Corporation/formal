// author: Chiel Kunkels (@chielkunkels)

var groupTypes; // gets required in initialise due to cyclic dependancy

module.exports = new Class({
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
			groupTypes = groupTypes || require('./../grouptypes');
			this.activeGroups = [];
			this.input.addEvent('change', this.checkDependancies.bind(this));
			this.checkDependancies();
		}
	},

	/**
	 *
	 */
	checkDependancies: function(){
		var self = this, value = this.input.get('value');
		if (value in this.spec.dependancies) {
			Array.each(this.spec.dependancies[value], function(group){
				self.activeGroups.push(new groupTypes[group.type](self.li, group));
			});
		} else {
			var group;
			while (this.activeGroups.length) {
				group = this.activeGroups.pop();
				group.destroy();
				delete group;
			}
		}

	}
});
