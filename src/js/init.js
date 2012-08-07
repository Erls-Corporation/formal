// author: Chiel Kunkels (@chielkunkels)
'use strict';

var pages = require('./pages'),
	groups = require('./groups'),
	fields = require('./fields');

pages.register('main', require('./pages/main'));

groups.register('main', require('./groups/main'));

fields.register('text', require('./fields/text'));
fields.register('select', require('./fields/select'));
fields.register('radio', require('./fields/radio'));
fields.register('checkbox', require('./fields/checkbox'));

window.Formal = require('./core');

