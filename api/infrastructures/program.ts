// 開発環境では手元のストレージに読み書きする
import * as fs from 'fs'

const getActualPath = (path: string) => {
  return 'storage/' + path
}

const readSource = (path: string) => {
  const actualPath = getActualPath(path)
  return fs.existsSync(actualPath)
    ? fs.readFileSync(actualPath, 'utf-8').toString()
    : ''
}

const writeSource = (path: string, source: string): void => {
  const actualPath = getActualPath(path)
  fs.writeFileSync(actualPath, source)
}

export { readSource, writeSource }
