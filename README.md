# Rubya

> Project destined to create json schema of visual form in vue.js

[![npm version](https://badge.fury.io/js/rubya.svg)](https://badge.fury.io/js/rubya)
[![Build Status](https://travis-ci.org/bertoni/rubya.svg?branch=master)](https://travis-ci.org/bertoni/rubya)
[![codecov](https://codecov.io/gh/bertoni/rubya/branch/master/graph/badge.svg)](https://codecov.io/gh/bertoni/rubya)

![Rubya image S2](assets/rubya.jpg "Rubya image S2")

*A tribute for my Pug Rubya*

Constructed for you make one [Json Schema](https://json-schema.org/) in a visual mode, in an easy and fastly way, without know the Json Schema rules.

## Install
```shell
npm install --save rubya
```
or
```shell
yarn add rubya
```

## Quick Start

### Import the component
``` javascript
import Vue from 'vue'
import Rubya from 'rubya'

Vue.use(Rubya)

```

### Integrate with your component
#### In your template
``` javascript
<template>
  <div id="app">
    <Rubya
      ref="Rubya"
      :schema="schema"
      @updated-schema="updatedSchema" />
  </div>
</template>
```
#### In your script
``` javascript
<script>
import Rubya from 'rubya'

export default {
  name: 'App',
  components: {
    Rubya
  },
  data () {
    return {
      schema: {
        '$schema': 'http://json-schema.org/draft-07/schema#',
        '$id': 'http://example.com/product.schema.json',
        'title': 'Root node of object',
        'description': 'Some description about node',
        'type': 'object',
        'required': [],
        'properties': {
          'date': {
            'type': 'string',
            'title': 'Date',
            'description': 'Date of birthday',
            'minLength': 10,
            'maxLength': 20,
            'pattern': '/[0-9]/',
            'format': 'date'
          }
        }
      }
    }
  },
  methods: {
    printSchema () {
      this.$refs.Rubya.getJsonSchema()
    },
    updatedSchema (schema) {
      console.log(JSON.stringify(schema, null, 2))
    }
  }
}
</script>
```

#### Recover the updated schema
Call your method
``` javascript
printSchema () {
  this.$refs.Rubya.getJsonSchema()
}
```
After you will receive the schema in the method that you declare in the template
``` javascript
updatedSchema (schema) {
  console.log(JSON.stringify(schema, null, 2))
}
```

## Internationalization
You can use the Rubya in any language that you want.
There are two options, specify the language that has all translations or provide your own translation.
#### Using default language (only available in "pt-br" for now, I will love more translates by pull requests S2)
``` javascript
<template>
  <div id="app">
    <Rubya
      ref="Rubya"
      :schema="schema"
      :language="language"
      @updated-schema="updatedSchema" />
  </div>
</template>

<script>
import Rubya from 'rubya'

export default {
  ...
  data () {
    return {
      schema: {
        ...,
        language: 'pt-br'
      }
    }
  },
  ...
}
</script>
```

#### Using your translate
``` javascript
<template>
  <div id="app">
    <Rubya
      ref="Rubya"
      :schema="schema"
      :i18n="i18n"
      @updated-schema="updatedSchema" />
  </div>
</template>

<script>
import Rubya from 'rubya'

export default {
  ...
  data () {
    return {
      schema: {
        ...,
        i18n: {
          'some text': 'your translate to "some text"'
        }
      }
    }
  },
  ...
}
</script>
```

Obs: You can combine these two options, using one default language and override some text with your translate. The i18n has priority and will override the language specified. If you provide these two, it is not necessary translate all texts, all default language will be used, except your own translate.


## Control what you see
You can control the elements that will be exhibit in the list. You can hidden the `title`, `identification`, `description` and `rules`.
This will be your list cleaner and shorter.

You can control this using the parameters: `hideTitle`, `hideIdentification`, `hideDescription` and `hideRules`.


## How works
![Rubya screen](assets/screen.png "Rubya screen")

Use can use the [demo page](https://bertoni.github.io/rubya/index.html) to see how it works.

Every field has two options:
* Edit: enable you change the field properties
* Remove: enable you to remove this field

For the fields types object and array, have more one option:
* New: enable you add new child for this fields

Child fields will always be identified after their parents and can be collapsed.


## Properties

|Name|Type|Required|Default Value |Info|
|---|---|---|---|---|
| schema | Object | No | {} |Your pre-existing schema|
| language | String | No | - |Language to translate all interface|
| i18n | Object | No | {} |Your own traduction|
| hideTitle | Boolean | No | false |Hide the titles in list|
| hideIdentification | Boolean | No | false |Hide the identifications in list|
| hideDescription | Boolean | No | false |Hide de descriptions in list|
| hideRules | Boolean | No | false |Hide de rules in list|

## Test your project with Jest

If you are receiving error "`SyntaxError: Cannot use import statement outside a module`" when testing your project with Jest, add this statement inside your `jest.config.js`:
````
transformIgnorePatterns: ['/node_modules/(?!rubya)/']
````


## LICENSE
MIT
