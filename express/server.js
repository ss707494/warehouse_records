const express = require('express')
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const app = express()

const init = () => {

  try {
    app.use(express.static(resolveApp('build')))

    app.use('*', function(req, res) {
      res.sendFile(resolveApp('build/index.html'))
    })
    app.listen(4469)
    console.log('running server at 4469')
  } catch (e) {
    console.log(e)
  }
}

init()
