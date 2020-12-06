const path = require('path')

/**
 * @typedef { import('./Liquid') } Liquid
 */

module.exports = class Package {
  /**
   * @param {Liquid} liquid
   */
  constructor(liquid, path, meta) {
    this._liquid = liquid
    this._path = path
    this._meta = meta
  }

  pathJoin(dir, file) {
    return path.join(this._path, dir, file)
  }

  getName() {
    return this._meta.name
  }

  async getFiles(dir) {
    const files = await this._liquid._fs.readdir(path.join(this._path, dir))

    return files.map((file) => file.replace(/\\/g, '/'))
  }
}
