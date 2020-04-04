<template>
  <div id="main">
    <h3>情報</h3>
      <infomations :errors="errors"/>
      <form>
        <label for="name">名前</label><br/>
        <input type="text" id="name" placeholder="名前" v-model="client.name">
        <label for="address">住所</label><br/>
        <input type="text" id="address" placeholder="お届け先住所" v-model="client.address">
        <label for="phone">電話番号</label><br/>
        <input type="text" id="phone" placeholder="電話番号" v-model="client.phone">
        <label for="memo">備考</label>
        <textarea id="memo" rows="10"></textarea>
      </form>
      <button class="btn agree" @click="submit">次へ進む</button>
  </div>
</template>

<script>
import Infomations from '@/components/Infomations'
export default {
  components: { Infomations },
  data () {
    return {
      client: { name: '', phone: '', address: '', memo: '' },
      errors: []
    }
  },
  created () {
    sessionStorage.clear()
  },
  methods: {
    submit () {
      this.errors = []
      if (this.client.name && this.client.phone && this.client.address) {
        let clientData = { name: this.client.name, address: this.client.address, phone: this.client.phone, memo: this.client.memo }
        sessionStorage.setItem('client', JSON.stringify(clientData))
        this.$router.push({ path: '/select' })
      } else {
        if (!this.client.name) this.errors.push('購入者の名前が空白です')
        if (!this.client.phone) this.errors.push('電話番号が空白です')
        if (!this.client.address) this.errors.push('配送先の住所が空白です')
      }
    }
  }
}
</script>

<style>
#memo {
  display: block;
  width: 100%;
}
</style>