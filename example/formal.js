(function(modules) {
    var cache = {}, require = function(id) {
        var module = cache[id];
        if (!module) {
            module = cache[id] = {};
            var exports = module.exports = {};
            modules[id].call(exports, require, module, exports, window);
        }
        return module.exports;
    };
    require("0");
})({
    "0": function(require, module, exports, global) {
        "use strict";
        var pages = require("1"), groups = require("3"), fields = require("4"), Core = require("5");
        pages.register("main", require("6"));
        groups.register("main", require("7"));
        fields.register("text", require("8"));
        fields.register("select", require("a"));
        fields.register("radio", require("b"));
        fields.register("checkbox", require("c"));
        window.Formal = {
            init: function(root, spec) {
                return new Core(root, spec);
            },
            Bases: {
                Field: require("9")
            },
            registerPage: function(type, definition) {
                pages.register(type, definition);
            },
            registerGroup: function(type, definition) {
                groups.register(type, definition);
            },
            registerField: function(type, definition) {
                fields.register(type, definition);
            }
        };
    },
    "1": function(require, module, exports, global) {
        "use strict";
        exports = module.exports = new (require("2"))("page");
    },
    "2": function(require, module, exports, global) {
        "use strict";
        exports = module.exports = new Class({
            initialize: function(typeName) {
                this.typeName = typeName;
                this.types = {};
            },
            register: function(type, definition) {
                this.types[type] = definition;
            },
            fetch: function(type) {
                if (!type || !(type in this.types)) {
                    throw new Error("Could not find " + this.typeName + ' type "' + type + '"');
                }
                return this.types[type];
            }
        });
    },
    "3": function(require, module, exports, global) {
        "use strict";
        exports = module.exports = new (require("2"))("group");
    },
    "4": function(require, module, exports, global) {
        "use strict";
        exports = module.exports = new (require("2"))("field");
    },
    "5": function(require, module, exports, global) {
        "use strict";
        var pages = require("1");
        exports = module.exports = new Class({
            activePage: -1,
            builtPages: {},
            initialize: function(root, spec) {
                this.form = document.id(root);
                this.spec = spec;
                this.wrapper = (new Element("div.pages")).inject(this.form);
                this.pageCount = this.spec.length;
                if (this.pageCount > 1) {
                    this.buildPaging();
                }
                this.showPage(0);
            },
            buildPaging: function() {
                var i = 0, self = this, href;
                this.pager = (new Element("nav")).adopt(this.pageList = (new Element("ul")).adopt((new Element("li")).adopt(new Element("a[href=#previous]", {
                    text: "Previous"
                })), (new Element("li")).adopt(new Element("a[href=#next]", {
                    text: "Next"
                })))).addEvent("click:relay(a)", function(e) {
                    e.preventDefault();
                    href = e.target.get("href");
                    if (href === "#previous") {
                        self.previous();
                    } else if (href === "#next") {
                        self.next();
                    }
                });
                this.pager.inject(this.form);
            },
            showPage: function(index) {
                index = parseInt(index, 0);
                if (typeOf(index) !== "number") {
                    return;
                }
                if (index < 0 || index > this.pageCount - 1) {
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
            hidePage: function(index) {
                index = parseInt(index, 0);
                if (typeOf(index) !== "number") {
                    return;
                }
                if (!(index in this.builtPages)) {
                    return;
                }
                this.builtPages[index].hide();
            },
            previous: function() {
                this.showPage(this.activePage - 1);
            },
            next: function() {
                this.showPage(this.activePage + 1);
            }
        });
    },
    "6": function(require, module, exports, global) {
        var groups = require("3"), pageId = 1;
        exports = module.exports = new Class({
            initialize: function(root, spec) {
                this.root = root;
                this.spec = spec;
                this.section = (new Element("section.page.page-" + pageId++, {
                    styles: {
                        display: "none"
                    }
                })).inject(this.root);
                Array.each(this.spec.groups, function(group) {
                    try {
                        (new (groups.fetch(group.type))(this.section, group)).attach();
                    } catch (e) {
                        console.warn(e.message);
                        return;
                    }
                }, this);
            },
            show: function() {
                this.section.setStyle("display", "block");
            },
            hide: function() {
                this.section.setStyle("display", "none");
            }
        });
    },
    "7": function(require, module, exports, global) {
        var fields = require("4");
        exports = module.exports = new Class({
            initialize: function(root, spec) {
                this.root = root;
                this.spec = spec;
                this.fieldset = (new Element("fieldset.group")).adopt(this.list = new Element("ul"));
                if (this.spec.title) {
                    this.legend = (new Element("legend", {
                        text: this.spec.title
                    })).inject(this.fieldset, "top");
                }
                Array.each(this.spec.fields, function(field) {
                    try {
                        new (fields.fetch(field.type))(this.list, field);
                    } catch (e) {
                        console.warn(e.message);
                        return;
                    }
                }, this);
            },
            detach: function() {
                this.fieldset.dispose();
            },
            attach: function() {
                this.fieldset.inject(this.root);
            },
            destroy: function() {
                this.fieldset.destroy();
            }
        });
    },
    "8": function(require, module, exports, global) {
        "use strict";
        var Base = require("9");
        exports = module.exports = new Class({
            Extends: Base,
            initialize: function(wrapper, spec) {
                this.wrapper = wrapper;
                this.spec = spec;
                this.li = (new Element("li")).adopt(this.label = new Element("label", {
                    text: this.spec.label || null
                }), this.input = new Element("input", {
                    value: this.spec.defaultValue || null,
                    name: this.spec.name || null
                }));
                if (this.spec.required && this.spec.required === true) {
                    this.input.set("required", "");
                }
                if (this.spec.validator && typeOf(this.spec.validator) === "object") {
                    this.input.set("pattern", this.spec.validator.regex);
                    this.input.set("title", this.spec.validator.pattern);
                }
                this.li.inject(wrapper);
                if (this.spec.dependancies && Object.keys(this.spec.dependancies).length) {
                    this.activeGroups = [];
                    this.input.addEvent("input", this.checkDependancies.bind(this));
                    this.checkDependancies();
                }
            }
        });
    },
    "9": function(require, module, exports, global) {
        "use strict";
        var groups = require("3");
        exports = module.exports = new Class({
            activeGroups: [],
            builtGroups: {},
            checkDependancies: function() {
                var self = this, values = this.getValue(), key, value;
                if (typeOf(values) !== "array") {
                    values = [ values ];
                }
                values.push(values.join(","));
                while (this.activeGroups.length) {
                    this.activeGroups.pop().detach();
                }
                while (values.length) {
                    value = values.shift();
                    if (value in this.spec.dependancies) {
                        if (!(value in this.builtGroups)) {
                            this.builtGroups[value] = [];
                            Array.each(this.spec.dependancies[value], function(group) {
                                try {
                                    self.builtGroups[value].push(new (groups.fetch(group.type))(self.li, group));
                                } catch (e) {
                                    console.warn(e.message);
                                }
                            });
                        }
                        Array.each(this.builtGroups[value], function(group) {
                            self.activeGroups.push(group);
                            group.attach();
                        });
                    }
                }
            },
            getValue: function() {
                return this.input.get("value");
            }
        });
    },
    a: function(require, module, exports, global) {
        var Base = require("9");
        module.exports = new Class({
            Extends: Base,
            initialize: function(wrapper, spec) {
                this.wrapper = wrapper;
                this.spec = spec;
                var multiple = "multiple" in this.spec && this.spec.multiple === true;
                this.li = (new Element("li")).adopt(this.label = new Element("label", {
                    text: this.spec.label || null
                }), this.input = new Element("select", {
                    name: this.spec.name ? this.spec.name + (multiple ? "[]" : "") : null,
                    multiple: multiple
                }));
                if (typeOf(this.spec.options) === "array") {
                    var length = this.spec.options.length, i = 0, options;
                    for (; i < length; i++) {
                        option = this.spec.options[i];
                        (new Element("option", {
                            text: option.label,
                            value: option.value,
                            selected: this.spec.defaultValue && this.spec.defaultValue === option.value
                        })).inject(this.input);
                    }
                }
                this.li.inject(wrapper);
                if (typeOf(this.spec.dependancies) === "object" && Object.keys(this.spec.dependancies).length) {
                    this.activeGroups = [];
                    this.input.addEvent("change", this.checkDependancies.bind(this));
                    this.checkDependancies();
                }
            },
            getValue: function() {
                return this.input.getElements(":selected").get("value");
            }
        });
    },
    b: function(require, module, exports, global) {
        var Base = require("9");
        module.exports = new Class({
            Extends: Base,
            initialize: function(wrapper, spec) {
                this.wrapper = wrapper;
                this.spec = spec;
                this.li = (new Element("li")).adopt(this.label = new Element("label", {
                    text: this.spec.label || null
                }), this.fieldset = (new Element("fieldset.radiobuttons")).adopt(this.list = new Element("ul")));
                this.inputs = $$();
                if (typeOf(this.spec.options) === "array") {
                    var length = this.spec.options.length, i = 0, options, input;
                    for (; i < length; i++) {
                        option = this.spec.options[i];
                        (new Element("li")).adopt(input = new Element("input", {
                            type: "radio",
                            name: this.spec.name,
                            value: option.value,
                            checked: this.spec.defaultValue && this.spec.defaultValue === option.value
                        }), new Element("label", {
                            text: option.label
                        })).inject(this.list);
                        this.inputs.push(input);
                    }
                }
                this.li.inject(wrapper);
                if (typeOf(this.spec.dependancies) === "object" && Object.keys(this.spec.dependancies).length) {
                    this.activeGroups = [];
                    this.inputs.addEvent("change", this.checkDependancies.bind(this));
                    this.checkDependancies();
                }
            },
            getValue: function() {
                var checked = this.inputs.filter(":checked");
                if (checked.length) {
                    return checked[0].get("value");
                }
            }
        });
    },
    c: function(require, module, exports, global) {
        var Base = require("9");
        module.exports = new Class({
            Extends: Base,
            initialize: function(wrapper, spec) {
                this.wrapper = wrapper;
                this.spec = spec;
                this.li = (new Element("li")).adopt(this.label = new Element("label", {
                    text: this.spec.label || null
                }), this.fieldset = (new Element("fieldset.checkboxes")).adopt(this.list = new Element("ul")));
                this.inputs = $$();
                if (typeOf(this.spec.options) === "array") {
                    var length = this.spec.options.length, i = 0, options, input;
                    if ("defaultValue" in this.spec && typeOf(this.spec.defaultValue) !== "array") {
                        this.spec.defaultValue = [ this.spec.defaultValue ];
                    }
                    for (; i < length; i++) {
                        option = this.spec.options[i];
                        (new Element("li")).adopt(input = new Element("input", {
                            type: "checkbox",
                            name: this.spec.name,
                            value: option.value,
                            checked: this.spec.defaultValue && this.spec.defaultValue.contains(option.value)
                        }), new Element("label", {
                            text: option.label
                        })).inject(this.list);
                        this.inputs.push(input);
                    }
                }
                this.li.inject(wrapper);
                if (typeOf(this.spec.dependancies) === "object" && Object.keys(this.spec.dependancies).length) {
                    this.activeGroups = [];
                    this.inputs.addEvent("change", this.checkDependancies.bind(this));
                    this.checkDependancies();
                }
            },
            getValue: function() {
                var checked = this.inputs.filter(":checked");
                if (checked.length) {
                    return checked.get("value");
                }
            }
        });
    }
});