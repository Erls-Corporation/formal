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
			this.input = new Element('input', {
				value: this.spec.defaultValue || null,
				name: this.spec.name || null
			})
		).inject(wrapper);

		if (this.spec.dependancies && Object.keys(this.spec.dependancies).length) {
			groupTypes = groupTypes || require('./../grouptypes')
			var triggers = Object.keys(this.spec.dependancies),
				self = this, value, activeGroups = [];

			this.input.addEvent('input', function(e){
				value = self.input.get('value');
				if (value in self.spec.dependancies) {
					Array.each(self.spec.dependancies[value], function(group){
						activeGroups.push(new groupTypes[group.type](self.li, group));
					});
				} else {
					var group;
					while (activeGroups.length) {
						group = activeGroups.shift();
						group.destroy();
						delete group;
					}
				}
			});
		}
	}
});
