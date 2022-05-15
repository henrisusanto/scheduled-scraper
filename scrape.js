const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true, image: false })

(() => {
    console.log('xixi')
})

async function xoxo() {
    return await nightmare
        .goto('https://time.is/id/')
        .wait('time')
        .evaluate(() => {
            var time = []
            for (span of document.querySelectorAll('time span')) time.push(span.innerHTML)
            return time.join('')
        })
        .end()
        .then((time) => {
            return time
        })
        .catch(error => {
            console.error('Search failed:', error)
        })
}