'use strict'
/* eslint-disable */

import { remote, shell } from 'electron'
import PDFDocument from 'pdfkit'
import path from 'path'
import fs from 'fs'
import config from '../datastore-config'

// data = {
//   items: [
//     { name: 'Apple', price: '300', quantity: '1', subtotal: 300 },
//     { name: 'Banana', price: '300', quantity: '1', subtotal: 330 }
//   ],
//   amount: 630,
//   name: 'foo',
//   phone: 'baz',
//   address: 'bar',
//   note: 'foobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbaz',
//   date: 'Mon Apr 06 2020 13:39:44 GMT+0900 (日本標準時)',
//   hash: 'e921b0fad6f09f0d503b69c035097cfe'
// }

// from = {
//   name: 'XXX Inc.',
//   address: 'Hyogo, Japan',
//   phone: 'XXX-XXX-XXXX'
// }

/**
 * Call function
 * 
 * receipt(data, from)
 */

export default function receipt(data) {
  const date = new Date(data.date)
  const dateText = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  const name = `${data.name} 様`
  const from = config.get('from')
  const doc = new PDFDocument({
    size: [595, 847],
    margin: 30
  })
  doc.font(path.resolve(__dirname, '..', 'assets', 'fonts', 'ipaexm.ttf'))
  doc.pipe(fs.createWriteStream(`./dist/electron/cache/${data.hash}.pdf`))
  // PAGE 1
  common(doc, dateText)
  doc.fontSize(30).text('領収証', 250, 50)
  doc.fontSize(18).text(name, 50, 100)
  // Print From data
  doc.fontSize(12).text(from.name, 420, 130).text(from.address, 420, 160).text(from.phone, 420, 185)
  createTable(doc, data.items, data.amount, 225)

  // PAGE 2
  doc.addPage()
  common(doc, dateText)
  doc.fontSize(30).text('受注票', 250, 50)
  doc.fontSize(12)
    .text('氏名', 50, 130)
    .text('住所', 50, 200)
    .text('電話番号', 50, 270)
    .text('備考', 300, 130)
  doc.fontSize(18)
    .text(`${data.name} 様`, 60, 150)
    .text(data.address, 60, 220)
    .text(data.phone, 60, 290)
    .text(data.note, 320, 150)
  createTable(doc, data.items, data.amount, 350)
  doc.moveTo(50, 750).lineTo(500, 750).stroke()
    .moveTo(50, 830).lineTo(500, 830).stroke()
    .moveTo(50, 750).lineTo(50, 830).stroke()
    .moveTo(200, 750).lineTo(200, 830).stroke()
    .moveTo(350, 750).lineTo(350, 830).stroke()
    .moveTo(500, 750).lineTo(500, 830).stroke()
  doc.end()
  open(data.hash)
}

function common(doc, dateText) {
  doc.fontSize(12)
    .text(dateText, 460, 30)
}

function createTable(doc, items, amount, height) {
  const x = [60, 300, 380, 460]
  let y = height
  doc.fontSize(16).text('商品名', x[0], y).text('数量', x[1], y).text('単価', x[2], y).text('小計', x[3], y)
  y += 25
  doc.moveTo(50, y).lineTo(550, y).stroke()
  y += 10
  items.forEach(item => {
    doc.text(item.name, x[0], y).text(item.quantity, x[1], y).text(item.price, x[2], y).text(item.subtotal, x[3], y)
    y += 30
    doc.moveTo(50, y).lineTo(550, y).stroke()
    y += 10
  })
  doc.fontSize(24).text(`合計 ${amount} 円`, 400, y + 20)
}

function open(filename) {
  shell.openItem(path.join(remote.app.getAppPath(), 'cache', filename + '.pdf'))
}