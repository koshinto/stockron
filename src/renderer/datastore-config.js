'use strict'
/* eslint-disable */

import Store from 'electron-store'
import { remote } from 'electron'

const config = new Store({
  cwd: remote.app.getAppPath()
})

if (config.get('from') === undefined) {
  config.set('from', {
    name: '',
    address: '',
    phone: ''
  })
}

export default config