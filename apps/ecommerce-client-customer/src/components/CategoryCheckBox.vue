<template>
  <div class="field">
      <b-checkbox v-model="checkbox">{{ category.title }}</b-checkbox>
  </div>
</template>

<script>
export default {
  name: 'CategoryCheckBox',
  props: ['category'],
  data () {
    return {
      checkbox: false
    }
  },
  watch: {
    checkbox(newValue) {
      this.$emit('handleCheck', this.category.id)
    }
  }
}
</script>
