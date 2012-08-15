// author: Chiel Kunkels (@chielkunkels)
'use strict';

var groups = require('./../groups');

exports = module.exports = new Class({
	activeGroups: [],
	builtGroups: {},

	/**
	 * Create a new field
	 * @param {Element} root Parent element to inject into
	 * @param {Object} spec Specification of the field
	 */
	initialize: function(root, spec){
		this.root = root;
		this.spec = spec;
		this.build();
	},

	/**
	 * Check if any dependencies should be triggered
	 */
	checkDependencies: function(){
		var values = this.getValue(), key, value, i, group;
		if (typeOf(values) !== 'array') {
			values = [values];
		}
		if (values.length > 1) {
			values.push(values.join(','));
		}

		while (this.activeGroups.length) {
			this.activeGroups.pop().detach();
		}

		while(values.length) {
			value = values.shift();
			if (value in this.spec.dependencies) {
				console.log('in group', this.spec.dependencies);
				if (!(value in this.builtGroups)) {
					console.log('not built yet');
					this.builtGroups[value] = [];
					for (i = 0; i < this.spec.dependencies[value].length; i++) {
						group = this.spec.dependencies[value][i];
						console.log(group);
						try {
							this.builtGroups[value].push(new (groups.fetch(group.type))(this.li, group));
						} catch(e) {
							console.warn(e.message);
						}
					}
				}
				for (i = 0; i < this.builtGroups[value].length; i++) {
					group = this.builtGroups[value][i];
					this.activeGroups.push(group);
					group.attach();
				}
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

