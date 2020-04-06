<template>
  <ul class="info" style="font-size: 0.8em">
      <li>購入者:  <span style="font-weight:bold;">{{ client.name }}</span></li>
      <li>配送先:  <span style="font-weight:bold;">{{ client.address }}</span></li>
      <li>電話番号:  <span style="font-weight:bold;">{{ client.phone }}</span></li>
      <li>備考:  <span style="font-weight:bold">{{ client.memo }}</span></li>
    </ul>
</template>

<script>
export default {
  props: [client],
}
</script>

<style>

</style>