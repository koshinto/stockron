<template>
  <div id="main">
    <h3>確認</h3>
    <h4>配送先</h4>
    <ul class="info" style="font-size: 0.8em">
      <li>購入者:  <span style="font-weight:bold;">{{ client.name }}</span></li>
      <li>配送先:  <span style="font-weight:bold;">{{ client.address }}</span></li>
      <li>電話番号:  <span style="font-weight:bold;">{{ client.phone }}</span></li>
      <li>備考:  <span style="font-weight:bold">{{ client.note }}</span></li>
    </ul>
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
export default {
  data () {
    return {
      client: {
        name: '',
        phone: '',
        address: '',
        note: ''
      },
      items: []
    }
  },
  created () {
    const client = JSON.parse(sessionStorage.getItem('client'))
    this.items = JSON.parse(sessionStorage.getItem('products'))
    console.log(sessionStorage.getItem('products'))
    this.client.name = client.name
    this.client.phone = client.phone
    this.client.address = client.address
    this.client.note = client.note
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