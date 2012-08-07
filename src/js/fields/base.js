// author: Chiel Kunkels (@chielkunkels)
'use strict';

var groups = require('./../groups');

exports = module.exports = new Class({
	activeGroups: [],
	builtGroups: {},

	/**
	 * Check if any dependancies should be triggered
	 */
	checkDependancies: function(){
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
						try {
							self.builtGroups[value].push(new (groups.fetch(group.type))(self.li, group));
						} catch(e) {
							console.warn(e.message);
						}
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

