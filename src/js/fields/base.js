// author: Chiel Kunkels (@chielkunkels)

var groupTypes; // gets required in initialise due to cyclic dependancy

module.exports = new Class({
	/**
	 * Check if any dependancies should be triggered
	 */
	checkDependancies: function(){
		groupTypes = groupTypes || require('./../grouptypes');

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

