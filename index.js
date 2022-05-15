const Nightmare = require('nightmare')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const interval = 10000
const logfile = `${__dirname}/scrape.log`
const logMaxLine = 5

app.get('/', async (req, res) => {
  fs.readFile(logfile, 'utf8', async (err, data) => {
    if (err) res.send(err)
    else {
      res.send(data.split('\n').join('<br>'))
    }
  })
})

app.listen(port, () => {
  doScrape()
  console.log(`Example app listening on port ${port}`)
})

function doScrape() {
  setTimeout(() => {
    writeLog(new Date())// scrape()
    doScrape()
  }, interval)
}

function scrape() {
  var log = `startedAt: ${new Date()}`
  const nightmare = Nightmare({ show: false, image: false })
  nightmare
    .goto('https://time.is/id/')
    .wait('time')
    .evaluate(() => {
      var time = []
      for (span of document.querySelectorAll('time span')) time.push(span.innerHTML)
      return time.join('')
    })
    .end()
    .then((result) => {
      log += ` - endedAt: ${new Date()}`
      log += ` | result: ${result}`
      writeLog(log)
    })
    .catch(error => {
      console.error('Search failed:', error)
    })
}

async function writeLog(content) {
  fs.readFile(logfile, 'utf8', (err, data) => {
    var lines = data.split('\n')
    lines.push(content)
    lines = lines.slice(Math.max(lines.length - logMaxLine, 0))
    fs.writeFile(logfile, lines.join('\n'), err => {
      if (err) console.error(err)
    })
  })
}