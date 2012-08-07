// author: Chiel Kunkels (@chielkunkels)
'use strict';

exports = module.exports = new Class({
	/**
	 *
	 */
	initialize: function(typeName){
		this.typeName = typeName;
		this.types = {};
	},

	/**
	 * Register a new group
	 * @param {String} type Type of group
	 * @param {Class} definition Definition of the group
	 */
	register: function(type, definition){
		this.types[type] = definition;
	},

	/**
	 * Fetch a group of a certain type
	 * @param {String} type Type of group
	 * @throws
	 * @return {Object} Definition of the group
	 */
	fetch: function(type){
		if (!type || !(type in this.types)) {
			throw new Error('Could not find '+this.typeName+' type "'+type+'"');
		}
		return this.types[type];
	}
});

