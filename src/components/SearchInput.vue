<template>
  <label>{{ label }}</label>
  <div>
    <select v-model="type" @change="$emit('update:type', $event.target.value)">
      <option>movie</option>
      <option>series</option>
      <option>episode</option>
    </select>
    <input type="text" :value="search" @input="$emit('update:search', $event.target.value)" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    label: {
      type: String,
      default: 'Default label'
    },
    type: {
      type: String,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  emits: ['update:type', 'update:search']
}
</script>

<style>

</style>