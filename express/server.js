const express = require('express')
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const app = express()

const dealZero = (num) => (num < 10 ? '0' : '') + num
const getNumber = () => {
  const now = new Date()
  return `${now.getFullYear()}${dealZero(now.getMonth() + 1)}${dealZero(now.getDate())}${dealZero(now.getHours())}${dealZero(now.getMinutes())}`
}

app.use(express.json())

const init = () => {

  try {
    app.use(express.static(resolveApp('build')))

    app.post('/writeToFile', (req, res) => {
      console.log(req.body)
      fs.writeFileSync('./dataByFile.txt', JSON.stringify(req.body))
      res.send(`${getNumber()}`)
    })

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
