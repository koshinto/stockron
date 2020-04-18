import fs from 'fs'
import glob from 'glob'

export default function clearCache (string) {
  glob(string, (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlinkSync(file)
      console.log(`${file} was deleted`)
    }
  })
}
