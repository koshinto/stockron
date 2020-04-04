<template>
  <div id="main">
    <h3>商品情報入力</h3>
    <ul class="info" style="font-size: 0.8em">
      <li>購入者:  <span style="font-weight:bold">{{ person.name }}</span></li>
      <li>配送先:  <span style="font-weight:bold">{{ person.address }}</span></li>
      <li>電話番号:  <span style="font-weight:bold">{{ person.phone }}</span></li>
    </ul>
    <infomations :errors="errors"/>

    <form>
      <label for="id">ID</label>
      <input type="text" id="id" placeholder="ID" v-model="form.id">
      <label for="name">商品名</label>
      <input type="text" id="name" placeholder="商品名" v-model="form.name">
      <label for="value">数量</label>
      <input type="number" id="value" placeholder="数量" v-model="form.value">
      <label for="price">単価</label>
      <input type="number" id="price" placeholder="単価" v-model="form.price">
    </form>
    <button class="btn add" @click="add">追加</button>
    <div v-if="items.length >= 1" >
      <button class="btn agree" @click="submit">次へ進む</button>
    </div>
    <hr/>
    <div class="card" v-for="(item, index) in items" :key="item.id">
      <h4>{{ item.name }}</h4>
      <div>
        <span>価格</span>
        {{ item.price }}
      </div>
      <div>
        <span>数量</span>
        {{ item.value }}
      </div>
      <button class="btn delete small" @click="remove(index)">削除</button>
    </div>
    <div id="basket" v-if="items.length">
      <img id="basket-icon" src="../assets/basket.svg" alt="basket" width="36px" height="36px"><span id="items-counter">{{ items.length }}</span>
    </div>
  </div>
</template>

<script>
import Infomations from '@/components/Infomations'
export default {
  components: { Infomations },
  data () {
    return {
      person: {
        name: '',
        phone: '',
        address: ''
      },
      items: [],
      form: {
        id: null,
        name: null,
        value: null,
        price: null,
        taxIncluded: false
      },
      errors: [],
      total: 0
    }
  },
  created: function () {
    let client = JSON.parse(sessionStorage.getItem('client'))
    this.person.name = client.name
    this.person.phone = client.phone
    this.person.address = client.address
  },
  methods: {
    add () {
      this.errors = []
      let data = this.form
      if (data.name && data.value && data.price) {
        let appendItem = { name: data.name, price: data.price, value: data.value, taxIncluded: data.taxIncluded }
        this.items.push(appendItem)
        data.id = ''
        data.name = ''
        data.price = ''
        data.value = ''
      } else {
        if (!data.name) this.errors.push('商品名が空白です')
        if (!data.price) this.errors.push('価格が空白です')
        if (!data.value) this.errors.push('数量が空白です')
      }
    },
    remove (index) {
      this.items.splice(index, 1)
    },
    submit () {
      this.errors = []
      if (this.items.length !== 0) {
        sessionStorage.setItem('products', JSON.stringify(this.items))
        this.$router.push({ path: '/confirm' })
      } else {
        this.errors.push('商品が入っていません')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
td
  display: inline-block
  padding: 0


#basket
  position: absolute
  display: inline
  right: 10px
  bottom: 10px
  padding: 10px 13px
  background-color: #D12A49
  border-radius: 50%
  text-align: center
  transition: 500ms
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)


#items-counter
  position: absolute
  right: 10px
  bottom: 5px
  padding: 0 6px
  font-weight: bold
  color: #D12A49
  background-color: white
  border-radius: 50%
</style>