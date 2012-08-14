// author: Chiel Kunkels (@chielkunkels)

var fields = require('./../fields');

exports = module.exports = new Class({

	/**
	 * Create a new element group
	 * @param {Element} root Parent element to inject into
	 * @param {Object} spec Specification of the group
	 */
	initialize: function(root, spec){
		this.root = root;
		this.spec = spec;

		this.fieldset = new Element('fieldset.group').adopt(
			this.list = new Element('ul')
		);

		if (this.spec.title) {
			this.legend = new Element('legend', {
				text: this.spec.title
			}).inject(this.fieldset, 'top');
		}

		Array.each(this.spec.fields, function(field){
			try {
				new (fields.fetch(field.type))(this.list, field);
			} catch (e) {
				console.warn(e.message);
				return;
			}
		}, this);
	},

	/**
	 * Remove the group from the DOM
	 */
	detach: function(){
		this.fieldset.dispose();
	},

	/**
	 * Inject the group into the DOM
	 */
	attach: function(){
		this.fieldset.inject(this.root);
	},

	/**
	 * Remove a group from the dom
	 */
	destroy: function(){
		this.fieldset.destroy();
	}
});

