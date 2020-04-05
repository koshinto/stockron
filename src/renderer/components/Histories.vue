<template>
  <div id="main">
    <h3>履歴一覧</h3>
    <table>
      <tr>
        <th>受付日</th>
        <th>氏名</th>
        <th>お届け先</th>
        <th></th>
      </tr>
      <tr v-for="column in columns" :key="column.hash">
        <td>{{ column.date }}</td>
        <td>{{ column.name }}</td>
        <td>{{ column.address }}</td>
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
      columns: null
    }
  },
  created () {
    ipcRenderer.send('get:histories')
  },
  mounted () {
    this.$electron.ipcRenderer.on('get:histories-reply', (e, data) => {
      this.columns = data
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