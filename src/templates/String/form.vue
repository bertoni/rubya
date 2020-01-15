<template>
  <div class="form-template">
    <h3>String</h3>
    <form class="form-object" @submit.prevent="save">
      <input v-if="allowChangeName" type="text" name="name" v-model="internalData.name" placeholder="Name" :class="(fieldsWithError.name ? 'error' : '')" />
      <textarea v-model="internalData.description" placeholder="Description"></textarea>
      <input type="text" name="identification" v-model="internalData.id" placeholder="Identification" />
      <input type="text" name="title" v-model="internalData.title" placeholder="Title" />
      <input type="number" v-model="internalData.minLength" placeholder="Minimum length" />
      <input type="number" v-model="internalData.maxLength" placeholder="Maximum length" />
      <input type="text" v-model="internalData.pattern" placeholder="Pattern" />
      <select v-model="internalData.format">
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
    this.internalData = {...this.originalObject}
  }
}
</script>
