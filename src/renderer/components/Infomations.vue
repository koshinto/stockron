<template>
  <div>
    <ul class="info" v-if="messages.length">
      <li v-for="message in messages" :key="message">{{ message }}</li>
    </ul>
    <ul class="info errors" v-if="errors.length">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    errors: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>