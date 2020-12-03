const fs = require('fs/promises')
const glob = require('glob')
const util = require('util')

const _glob = util.promisify(glob)

module.exports = class FS {
  async readFile(src) {
    const content = await fs.readFile(src, {
      encoding: 'utf-8',
    })

    return content
  }

  async writeFile(dst, content) {
    await fs.writeFile(dst, content, {
      encoding: 'utf-8',
    })
  }

  async readdir(path) {
    const content = await _glob('**/*.*', {
      cwd: path,
    })

    return content
  }

  async mkdir(path) {
    await fs.mkdir(path, {
      recursive: true,
    })
  }

  async rmdir(path) {
    await fs.rmdir(path, {
      recursive: true,
    })
  }

  static mock(files) {
    return {
      readdir: (path) => {
        return files
          .map((file) => file.path)
          .filter((_path) => _path.startsWith(path))
          .map((_path) => _path.replace(path + '/', ''))
      },
    }
  }
}
