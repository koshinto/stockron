<template>
  <div id="main">
    <h3>履歴一覧</h3>
    <table>
      <tr>
        <th>受付日</th>
        <th>氏名</th>
        <th>お届け先</th>
        <th>ボタン</th>
      </tr>
      <tr v-for="column in columns" :key="column.hash">
        <td>{{ column.date }}</td>
        <td>{{ column.name }}</td>
        <td>{{ column.address }}</td>
        <!-- <td><button class="btn agree" @click="detail(column.hash)">詳細</button></td> -->
        <td><router-link :to="{ name: 'history', params: { hash: column.hash } }">詳細</router-link></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      columns: null,
      object: [
        {id: 1, key: 1, index: 1}
      ]
    }
  },
  created () {
    ipcRenderer.send('get:histories')
  },
  mounted () {
    this.$electron.ipcRenderer.on('get:histories-reply', (e, data) => {
      this.columns = data
      console.log(data)
    })
  },
  methods: {
    detail (hash) {
      this.$router.push({ name: 'history', params: { hash: hash } })
    }
  }
}
</script>

<style>
</style>