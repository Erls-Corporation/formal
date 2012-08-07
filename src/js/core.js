// author: Chiel Kunkels (@chielkunkels)
'use strict';

var pages = require('./pages');

exports = module.exports = new Class({
	activePage: -1,
	builtPages: {},

	/**
	 * Instantiate a new form
	 * @param {Element} root Element to build the form into
	 * @param {Object} spec Specification of how the form should look
	 */
	initialize: function(root, spec){
		this.form = document.id(root);
		this.spec = spec;

		this.wrapper = new Element('div.pages').inject(this.form);

		this.pageCount = this.spec.length;
		if (this.pageCount > 1) {
			this.buildPaging();
		}

		this.showPage(0);
	},

	/**
	 * Build up paging
	 */
	buildPaging: function(){
		var i = 0, self = this, href;
		this.pager = new Element('nav').adopt(
			this.pageList = new Element('ul').adopt(
				new Element('li').adopt(
					new Element('a[href=#previous]', {text: 'Previous'})
				),
				new Element('li').adopt(
					new Element('a[href=#next]', {text: 'Next'})
				)
			)
		).addEvent('click:relay(a)', function(e){
			e.preventDefault();
			href = e.target.get('href');
			if (href === '#previous') {
				self.previous();
			} else if (href === '#next') {
				self.next();
			}
		});
		this.pager.inject(this.form);
	},

	/**
	 * Show page by index
	 * @param {Number} index Page index to show
	 */
	showPage: function(index){
		index = parseInt(index, 0);
		if (typeOf(index) !== 'number') {
			return;
		}

		if (index < 0 || index > (this.pageCount - 1)) {
			return;
		}

		if (!(index in this.builtPages)) {
			try {
				this.builtPages[index] = new (pages.fetch(this.spec[index].type))(this.wrapper, this.spec[index]);
			} catch (e) {
				console.warn(e.message);
				return;
			}
		}

		if (this.activePage >= 0) {
			this.hidePage(this.activePage);
		}

		this.builtPages[index].show();
		this.activePage = index;
	},

	/**
	 * Hide a page by index
	 * @param {Number} index Page index to show
	 */
	hidePage: function(index){
		index = parseInt(index, 0);
		if (typeOf(index) !== 'number') {
			return;
		}

		if (!(index in this.builtPages)) {
			return;
		}

		this.builtPages[index].hide();
	},

	/**
	 * Go to the previous page
	 */
	previous: function(){
		this.showPage(this.activePage - 1);
	},

	/**
	 * Go to the next page
	 */
	next: function(){
		this.showPage(this.activePage + 1);
	}
});

