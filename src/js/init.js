// author: Chiel Kunkels (@chielkunkels)
'use strict';

var pages = require('./pages'),
	groups = require('./groups'),
	fields = require('./fields'),
	Core = require('./core');

pages.register('main', require('./pages/main'));

groups.register('main', require('./groups/main'));

fields.register('text', require('./fields/text'));
fields.register('select', require('./fields/select'));
fields.register('radio', require('./fields/radio'));
fields.register('checkbox', require('./fields/checkbox'));

/**
 * Public api
 */
window.Formal = {
	/**
	 * Create a new Formal instance
	 * @param {Element} root Element to build the form in
	 * @param {Array} spec Specification of the form
	 * @return {Object} A new Formal instance
	 */
	init: function(root, spec){
		return new Core(root, spec);
	},

	/**
	 * Base types which can be used to extend custom types
	 */
	Bases: {
		Field: require('./fields/base')
	},

	/**
	 * Register a new page
	 * @param {String} type Type of page
	 * @param {Class} definition Definition of the page
	 */
	registerPage: function(type, definition){
		pages.register(type, definition);
	},

	/**
	 * Register a new group
	 * @param {String} type Type of group
	 * @param {Class} definition Definition of the group
	 */
	registerGroup: function(type, definition){
		groups.register(type, definition);
	},

	/**
	 * Register a new field
	 * @param {String} type Type of field
	 * @param {Class} definition Definition of the field
	 */
	registerField: function(type, definition){
		fields.register(type, definition);
	}
};

