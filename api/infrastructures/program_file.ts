// 開発環境では手元のストレージに読み書きする
import * as fs from 'fs'

const readProgramFile = (path: string) => {
  return fs.readFileSync('storage/' + path, 'utf-8').toString()
}

export default readProgramFile
