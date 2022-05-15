const Nightmare = require('nightmare')
const express = require('express')
const app = express()
const port = 3000
const interval = 60000

app.get('/', async (req, res) => {
  res.send(200)
})

app.listen(port, () => {
  doScrape()
  console.log(`Example app listening on port ${port}`)
})

function doScrape() {
  setTimeout(() => {
    scrape()
    doScrape()
  }, interval)
}

function scrape() {
  const nightmare = Nightmare({ show: false, image: false })
  nightmare
    .goto('https://twitter.com/')
    .wait('[href="/login"]')
    .click('[href="/login"]')
    .wait('[name="text"]')
    .type('[name="text"]', 'liemgioktian18')
    .click('[role="button"]:nth-child(6)')
    .wait('[name="password"]')
    .type('[name="password"]', 'x123123x')
    .click('[data-testid="LoginForm_Login_Button"]')
    .wait('[data-offset-key].public-DraftStyleDefault-block.public-DraftStyleDefault-ltr')
    .click('[data-offset-key].public-DraftStyleDefault-block.public-DraftStyleDefault-ltr')
    .type('[data-offset-key].public-DraftStyleDefault-block.public-DraftStyleDefault-ltr', new Date())
    .click('[data-testid="tweetButtonInline"]')
    .end()
    .then(result => {
      console.log('done', new Date())
    })
    .catch(error => {
      console.error('Search failed:', error)
    })
}