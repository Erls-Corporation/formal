// author: Chiel Kunkels (@chielkunkels)

var groups = require('./../groups'),
	pageId = 1;

exports = module.exports = new Class({

	/**
	 * Create a new page
	 */
	initialize: function(root, spec){
		this.root = root;
		this.spec = spec;

		this.section = new Element('section.page.page-'+(pageId++), {
			styles: { display: 'none' }
		}).inject(this.root);

		Array.each(this.spec.groups, function(group){
			try {
				new (groups.fetch(group.type))(this.section, group).attach();
			} catch(e) {
				console.warn(e.message);
				return;
			}
		}, this);
	},

	/**
	 * Show the page
	 */
	show: function(){
		this.section.setStyle('display', 'block');
	},

	/**
	 * Hide the page
	 */
	hide: function(){
		this.section.setStyle('display', 'none');
	}

});
