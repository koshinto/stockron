'use strict'
/* eslint-disable */

export default class Basket {
  constructor () {
    this.products = []
    this.taxRate = 1.1
  }

  init () {
    this.products = []
  }

  add (product) {
    this.products.push(product)
  }

  build () {
    let data = {}
    let items = []
    let amount = 0
    if (this.products.length) {
      this.products.forEach(product => {
        let subtotal = 0
        if (product.tax) subtotal = Math.round(product.price * product.value * this.taxRate)
        else subtotal = Math.round(product.price * product.value)
        amount += subtotal
        items.push({
          name: product.name,
          price: product.price,
          quantity: product.value,
          subtotal: subtotal
        })
      })
      data.items = items
      data.amount = amount
    }
    return data
  }
}