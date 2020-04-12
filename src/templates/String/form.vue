<template>
  <div class="form-template">
    <h3>{{ translate('String') }}</h3>
    <form class="form-object" @submit.prevent="save">
      <fieldset v-if="allowChangeName">
        <label for="name" class="fieldplaceholder">{{ translate('Name') }}</label>
        <input type="text" name="name" id="name" v-model="internalData.name" :class="(fieldsWithError.name ? 'error' : '')" />
      </fieldset>
      <fieldset>
        <label for="minLength" class="fieldplaceholder">{{ translate('Minimum length') }}</label>
        <input type="number" name="minLength" id="minLength" v-model.number="internalData.minLength" />
      </fieldset>
      <fieldset>
        <label for="maxLength" class="fieldplaceholder">{{ translate('Maximum length') }}</label>
        <input type="number" name="maxLength" id="maxLength" v-model.number="internalData.maxLength" />
      </fieldset>
      <fieldset>
        <label for="pattern" class="fieldplaceholder">{{ translate('Pattern') }}</label>
        <input type="text" name="pattern" id="pattern" v-model="internalData.pattern" />
      </fieldset>
      <fieldset>
        <label for="format" class="fieldplaceholder">{{ translate('Format') }}</label>
        <select name="format" id="format" v-model="internalData.format">
          <option value="">{{ translate('No format') }}</option>
          <optgroup label="Date">
            <option value="date-time">{{ translate('Date time') }} (2018-11-13T20:20:39+00:00)</option>
            <option value="time">{{ translate('Time') }} (20:20:39+00:00)</option>
            <option value="date">{{ translate('Date') }} (2018-11-13)</option>
          </optgroup>
          <optgroup label="Email">
            <option value="email">{{ translate('Internet email address') }}</option>
            <option value="idn-email">{{ translate('The internationalized form of an Internet email address') }}</option>
          </optgroup>
          <optgroup label="Hostnames">
            <option value="hostname">{{ translate('Internet host name') }}</option>
            <option value="idn-hostname">{{ translate('An internationalized Internet host name') }}</option>
          </optgroup>
          <optgroup label="IP Address">
            <option value="ipv4">{{ translate('IPv4 address') }}</option>
            <option value="ipv6">{{ translate('IPv6 address') }}</option>
          </optgroup>
          <optgroup label="Resource identifiers">
            <option value="uri">{{ translate('A universal resource identifier (URI)') }}</option>
            <option value="uri-reference">{{ translate('A URI Reference (either a URI or a relative-reference)') }}</option>
          </optgroup>
          <optgroup label="Regular Expressions">
            <option value="regex">{{ translate('A regular expression') }}</option>
          </optgroup>
        </select>
      </fieldset>
      <fieldset v-show="!showCommonFields">
        <button class="show-common-fields" @click.prevent="showCommonFields = true">{{ translate('show common fields') }}</button>
      </fieldset>
      <fieldset v-show="showCommonFields">
        <label for="title" class="fieldplaceholder">{{ translate('Title') }}</label>
        <input type="text" name="title" id="title" v-model="internalData.title" />
      </fieldset>
      <fieldset v-show="showCommonFields">
        <label for="id" class="fieldplaceholder">{{ translate('Identification') }}</label>
        <input type="text" name="id" id="id" v-model="internalData.id" />
      </fieldset>
      <fieldset v-show="showCommonFields">
        <label for="description" class="fieldplaceholder">{{ translate('Description') }}</label>
        <textarea name="description" id="description" v-model="internalData.description"></textarea>
      </fieldset>
    </form>
    <div class="control-form">
      <button class="save" @click.prevent="save">{{ translate('save') }}</button>
      <button class="cancel" @click.prevent="cancel">{{ translate('cancel') }}</button>
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
    translate: {
      type: Function,
      required: true
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
      internalData: {},
      showCommonFields: false
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
