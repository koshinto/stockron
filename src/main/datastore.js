import Datastore from 'nedb'
import { join } from 'path'
import { remote } from 'electron'
export default new Datastore({
  autoload: true,
  filename: join(remote.app.getPath('documents'), 'data.db')
})
