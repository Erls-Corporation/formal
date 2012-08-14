// author: Chiel Kunkels (@chielkunkels)
'use strict';

/**
 * Allows for creating new factory-like objects which can store types
 * and return them for instantiation
 */
exports = module.exports = new Class({
	/**
	 * Create a new factory for a type
	 * @param {String} typeName Name of the type
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
	 * @return {Object} Definition of the group
	 * @throws {Error} If the type could not be found
	 */
	fetch: function(type){
		if (!type || !(type in this.types)) {
			throw new Error('Could not find '+this.typeName+' type "'+type+'"');
		}
		return this.types[type];
	}
});

