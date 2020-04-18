'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import clearCache from './util/clearcache'
import Datastore from 'nedb'
import md5 from 'md5'
import Basket from './basket'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
app.allowRendererProcessReuse = true

let datastore = new Datastore({
  filename: path.join(app.getPath('documents'), 'sales-manager/history.db'),
  autoload: true
})

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  clearCache('dist/electron/cache/*.pdf')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('quit', () => {
  if (process.env.NODE_ENV === 'development') datastore.remove({}, { multi: true })
})

function historyOfDatas () {
  datastore.count({}, function (err, count) {
    if (err) console.log(err)
    console.log(`Datastore: ${count}`)
  })
}

// let item1 = { name: 'Product Name', price: 000, value: 0, taxIncluded: bool }
let basket = new Basket()

ipcMain.handle('request:receipt', async (e, args) => {
  const client = args[0]
  const inBaskets = args[1]
  console.log(`Basket in ${JSON.stringify(inBaskets)}`)
  basket.init()
  inBaskets.forEach(inBasket => basket.add(inBasket))
  let doc = basket.build()
  doc.name = client.name
  doc.phone = client.phone
  doc.address = client.address
  doc.note = client.note
  /**
   * Change hash generate to Confirn Page
   * Hash value is unique in DB
   * */
  const todayString = new Date().toString()
  doc.date = todayString
  doc.hash = md5(todayString)
  console.log(doc)
  datastore.insert(doc)
  historyOfDatas()
  return doc.hash
})

ipcMain.on('get:histories', (event) => {
  datastore.find({}, (err, docs) => {
    if (err) console.log(err)
    event.sender.send('get:histories-reply', docs)
  })
})

ipcMain.on('find:history', (event, arg) => {
  datastore.findOne({ hash: arg }, (err, doc) => {
    if (err) console.log(err)
    event.sender.send('find:history-reply', doc)
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
