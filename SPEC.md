# Form builder

A form is specified in a JSON format, in order to make it easy to maintain, and
easy to share between front/backend, especially with regards to validation.

Formal builds upon the concepts of pages and groups. Even if your form has only
a single page and/or group , it will still expect that group to be specified.

A sample formal spec would look like this:

```json
[{
	"title": "Page 1",
	"groups": [{
		"type": "main",
		"title": "Group 1",
		"elements": [{
			"type": "text",
			"name": "firstName"
		}, {
			"type": "text",
			"name": "lastName"
		}]
	}]
}]
```

The relationship goes a bit like this: `pages` hold `groups` which hold
`fields`. You'll be able to read more on each of these below.

With the way dependencies are specified, it makes it very easy for your backend
to use the same JSON spec, and verify if the required fields are actually coming
through.

## Opinionated? Maybe a little...

Formal will make some assumptions about your forms. For example, when a field
does not have an id, it will automatically generate an id using the name if
possible and using a numeric index if no name was provided. Why? This makes it
easier to hook into with javascript to define custom behaviour.

## Pages

Each form consists of one or more pages. Forms can often look a bit daunting if
it looks like it goes on forever. Splitting a form up into pages can help
overcome the boredom of filling in forms.

## Groups

Each page is divided into one or more groups, which is represented by an array
in the `groups` key. Dividing a pages into groups means you can logically group
questions together and present them in a way that makes sense for that set of
questions.

## Fields

Within each group, there's an `elements` property. This holds the description
for each field being used. Below you'll find a list of all field types, and how
they are built up.

### Options

These options are generic for all field types

- `type`: Defines what field type you desire,
- `label`: The label text to be used
- `id`: Id of the field (useful for javascript hooks)
- `name`: Name of the field. This will be important for your server-side code
- `defaultValue`: Default value to put into the field
- `attributes`: An object with key/value pairs for html attributes. Useful for
	setting placeholders and data attributes

### Regular field

Example field specification:

```json
{
	"type": "text",
	"id": "firstName",
	"name": "firstName",
	"defaultValue": ""
}
```

### Select box

Example field specification:

```json
{
	"type": "select",
	"id": "firstName",
	"name": "firstName",
	"multiple": false,
	"options": [{
		"label": "Value 1",
		"value": "key1"
	}, {
		"label": "Value 2",
		"value": "key2"
	}],
	"defaultValue": "key1"
}
```

- The reason options is an array of objects, rather than just an object with all
	options as key:value pairs, is because browsers are inconsistent when it comes
	to how objects are ordered. Arrays, however, are always ordered in the order
	they are specified.
- **Multiple-value select boxes:** If you have `multiple: true` specified,
	`defaultValue` can also be specified as an array of keys.
- `defaultValue` can also be false -- or omitted entirely -- if an empty
	starting value is desired at the top of the select box.

### Radio boxes

Example field specification:

```json
{
	"type": "radio",
	"id": "firstName",
	"name": "firstName",
	"options": {
		"key1": "value1",
		"key2": "value2"
	},
	"defaultValue": "key1"
}
```

### Checkboxes

Example field specification:

```json
{
	"type": "checkbox",
	"id": "firstName",
	"name": "firstName",
	"options": {
		"key1": "value1",
		"key2": "value2"
	},
	"defaultValue": "key1"
}
```

- `defaultValue` may also be an array of keys to be selected by default.

## Dependencies

Sometimes, cases arise where you want to be able to show an extra section of a
form based on filled in values; to do this, we have a mechanism called
dependency groups.

In any given form definition you can add a key called `dependencies`, which
takes an object containing more group/field specifications as it's value.

```json
{
	"dependencies": {
		"value to trigger on": [{
			"type": "inline",
			"elements": [{
				"type": "text",
				...
			}, {
				"type": "select".
				...
			}]
		}]
	}
}
```

The type of field this dependency is linked to will determine how it's
triggered. If it's a text field, for example, the dependency will render if the
user types in "value to trigger on" and then blurs from the field.

For a select box, it'll trigger when the user selects a certain key in the list.

