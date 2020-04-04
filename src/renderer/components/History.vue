<template>
  <div id="main">
    <h3>履歴</h3>
    <p v-if="nowLoading">Now loading...</p>
    <div v-else>
      <p>{{ data.name }}</p>
      <p>{{ data.address }}</p>
      <p>{{ data.phone }}</p>
      <p>{{ data.date }}</p>
      <table>
        <tr>
          <th>商品名</th><th>単価</th><th>数量</th><th>小計</th>
        </tr>
        <tr v-for="item in data.items" :key="item.name">
          <td>{{ item.name }}</td><td>{{ item.price }}</td><td>{{ item.quantity }}</td><td>{{ item.subtotal }}</td>
        </tr>
      </table>
      <hr/>
      合計
      <p>{{ data.amount }}</p>
      <button class="btn agree">領収証を作成する</button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      hash: '',
      data: [],
      nowLoading: true
    }
  },
  created () {
    this.hash = this.$route.params.hash
    ipcRenderer.send('find:history', this.hash)
  },
  mounted () {
    ipcRenderer.on('find:history-reply', (event, data) => {
      this.data = data
      this.nowLoading = false
    })
  }
}
</script>

<style>

</style>