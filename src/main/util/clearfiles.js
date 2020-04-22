import fs from 'fs'
import glob from 'glob'

export default function clearFiles (string) {
  glob(string, (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlinkSync(file)
      const dir = file.split('/')
      console.log(`${dir[dir.length - 1]} was deleted`)
    }
  })
}
