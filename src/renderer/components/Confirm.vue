<template>
  <div id="main">
    <h3>確認</h3>
    <h4>配送先</h4>
    <client :client="client"/>
    <h4>お届け商品情報</h4>
    <ul>
      <li class="info" v-for="item in items" :key="item.id">
        <h4>{{ item.name }}</h4>
        <p>{{ item.price }}</p>
        <p>{{ item.value }}</p>
      </li>
    </ul>
    <button class="btn agree" @click="submit">作成</button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Client from '@/components/partials/Client'
export default {
  components: { Client },
  data () {
    return {
      client: {},
      items: []
    }
  },
  created () {
    this.client = JSON.parse(sessionStorage.getItem('client'))
    this.items = JSON.parse(sessionStorage.getItem('products'))
    console.log(sessionStorage.getItem('products'))
  },
  methods: {
    submit () {
      ipcRenderer.invoke('request:receipt', [this.client, this.items]).then((result) => {
        this.$router.push({ name: 'history', params: { hash: result } })
      })
    }
  }
}
</script>

<style>

</style>