import * as cons from 'consolidate'
import * as path from 'path'
import { isArray, isFunction } from 'lodash'

export default async function renderTemplate(template, options: any = {}) {
  const {
    basePath = process.cwd(),
    locals = {},
    config = {
      engines: {}
    }
  } = options

  try {
    const rendered = isArray(template)
      ? await Promise.all(template.map(compile))
      : await compile(template)

    return rendered
  } catch (error) {
    throw new Error(`(@electron/stitch: lib/renderTemplate) ${error.message}`)
  }

  async function compile(file) {
    const ext = path.extname(file).replace('.', '')

    const compileFn = config.engines[ext] || cons[ext]

    if (!isFunction(compileFn)) {
      throw new Error(
        '(@electron/stitch: lib/renderTemplate) ' +
          `Error rendering template with extension ${ext}: Can only render ` +
          'templates supported by https://www.npmjs.com/package/consolidate.'
      )
    }

    const filePath = path.join(basePath, file)

    try {
      const html = await compileFn(filePath, locals)

      // FIXME: Why does consolidate mutate locals?
      delete locals.filename

      return html
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
