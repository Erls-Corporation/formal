// author: Chiel Kunkels (@chielkunkels)

var groupTypes; // gets required in initialise due to cyclic dependancy

module.exports = new Class({
	activeGroups: [],
	builtGroups: {},

	/**
	 * Check if any dependancies should be triggered
	 */
	checkDependancies: function(){
		groupTypes = groupTypes || require('./../grouptypes');

		var self = this, values = this.getValue(), key, value;
		if (typeOf(values) !== 'array') {
			values = [values];
		}
		values.push(values.join(','));

		while (this.activeGroups.length) {
			this.activeGroups.pop().detach();
		}

		while(values.length) {
			value = values.shift();
			if (value in this.spec.dependancies) {
				if (!(value in this.builtGroups)) {
					this.builtGroups[value] = [];
					Array.each(this.spec.dependancies[value], function(group){
						self.builtGroups[value].push(new groupTypes[group.type](self.li, group));
					});
				}
				Array.each(this.builtGroups[value], function(group){
					self.activeGroups.push(group);
					group.attach();
				});
			}
		}
	},

	/**
	 * Get the value of this field
	 */
	getValue: function(){
		return this.input.get('value');
	}
});

