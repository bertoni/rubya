<template>
  <div class="form-template">
    <h3>String</h3>
    <form class="form-object" @submit.prevent="save">
      <fieldset v-if="allowChangeName">
        <label for="name" class="fieldplaceholder">Name</label>
        <input type="text" name="name" id="name" v-model="internalData.name" :class="(fieldsWithError.name ? 'error' : '')" />
      </fieldset>
      <fieldset>
        <label for="description" class="fieldplaceholder">Description</label>
        <textarea name="description" id="description" v-model="internalData.description"></textarea>
      </fieldset>
      <fieldset>
        <label for="id" class="fieldplaceholder">Identification</label>
        <input type="text" name="id" id="id" v-model="internalData.id" />
      </fieldset>
      <fieldset>
        <label for="title" class="fieldplaceholder">Title</label>
        <input type="text" name="title" id="title" v-model="internalData.title" />
      </fieldset>
      <fieldset>
        <label for="minLength" class="fieldplaceholder">Minimum length</label>
        <input type="number" name="minLength" id="minLength" v-model="internalData.minLength" />
      </fieldset>
      <fieldset>
        <label for="maxLength" class="fieldplaceholder">Maximum length</label>
        <input type="number" name="maxLength" id="maxLength" v-model="internalData.maxLength" />
      </fieldset>
      <fieldset>
        <label for="pattern" class="fieldplaceholder">Pattern</label>
        <input type="text" name="pattern" id="pattern" v-model="internalData.pattern" />
      </fieldset>
      <fieldset>
        <label for="format" class="fieldplaceholder">Format</label>
        <select name="format" id="format" v-model="internalData.format">
          <option value="">No format</option>
          <optgroup label="Date">
            <option value="date-time">Date time (2018-11-13T20:20:39+00:00)</option>
            <option value="time">Time (20:20:39+00:00)</option>
            <option value="date">Date (2018-11-13)</option>
          </optgroup>
          <optgroup label="Email">
            <option value="email">Internet email address</option>
            <option value="idn-email">The internationalized form of an Internet email address</option>
          </optgroup>
          <optgroup label="Hostnames">
            <option value="hostname">Internet host name</option>
            <option value="idn-hostname">An internationalized Internet host name</option>
          </optgroup>
          <optgroup label="IP Address">
            <option value="ipv4">IPv4 address</option>
            <option value="ipv6">IPv6 address</option>
          </optgroup>
          <optgroup label="Resource identifiers">
            <option value="uri">A universal resource identifier (URI)</option>
            <option value="uri-reference">A URI Reference (either a URI or a relative-reference)</option>
            <option value="iri">nationalized equivalent of a “uri”</option>
            <option value="iri-reference">The internationalized equivalent of a “uri-reference”</option>
          </optgroup>
          <optgroup label="Regular Expressions">
            <option value="regex">A regular expression</option>
          </optgroup>
        </select>
      </fieldset>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">save</button>
      <button class="cancel" @click.prevent="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import StringType from '../../DataStructure/StringType.js'

export default {
  name: 'StringForm',
  props: {
    allowChangeName: {
      type: Boolean,
      default: () => true
    },
    originalObject: {
      type: StringType,
      required: true
    }
  },
  data () {
    return {
      fieldsWithError: {
        name: false
      },
      internalData: {}
    }
  },
  methods: {
    save () {
      for (let idx in this.fieldsWithError) {
        this.fieldsWithError[idx] = false
      }
      if (this.allowChangeName && !this.internalData.name.length) {
        this.fieldsWithError.name = true
        return false
      }
      this.$emit('change', new StringType(this.internalData, this.internalData.name))
    },
    cancel () {
      this.$emit('close')
    }
  },
  mounted () {
    this.internalData = { ...this.originalObject }
  }
}
</script>
