const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true, image: false })

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
    .then(console.log)
    .catch(error => {
        console.error('Search failed:', error)
    })