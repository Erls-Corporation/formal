// author: Chiel Kunkels (@chielkunkels)
'use strict';

var Base = require('./base'),
	groups = require('./../groups'),
	pageId = 1;

exports = module.exports = new Class({
	Extends: Base,

	/**
	 * Build the page elements
	 */
	build: function(){
		this.page = new Element('section.page.page-'+(pageId++), {
			styles: { display: 'none' }
		});

		if (this.spec.title && typeOf(this.spec.title) === 'string') {
			new Element('h2', {text: this.spec.title}).inject(this.page);
		}

		Array.each(this.spec.groups, function(group){
			try {
				new (groups.fetch(group.type))(this.page, group).attach();
			} catch(e) {
				console.warn(e.message);
				return;
			}
		}, this);

		this.page.inject(this.root);
	}
});

