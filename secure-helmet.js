const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const app = express()

const suid = uuid()

app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))

app.use(helmet.contentSecurityPolicy({
  directives: {
    // By default do not allow unless whitelisted
    defaultSrc: [`'none'`],
    // Only allow scripts with this nonce
    scriptSrc: [`'nonce-${suid}'`],
    reportUri: '/csp-violation'
  }
}))

app.post('/csp-violation', (req, res, next) => {
  const { body } = req
  if (body) {
    console.log('CSP Report Violation:')
    console.dir(body, { colors: true, depth: 5})
  }
  res.status(204).send()
})

app.use(helmet.dnsPrefetchControl({
  allow: false
}))

app.use(helmet.frameguard({
  action: 'deny'
}))

app.use(helmet.hidePoweredBy({
  setTo: 'Django/1.2.1 SVN-13336'
}))

app.use(helmet.ieNoOpen())

app.use(helmet.noSniff())

app.use(helmet.referrerPolicy({
  policy: 'same-origin'
}))

app.use(helmet.xssFilter())

app.get('/', (req, res, next) => {
  res.send(` 
    <!DOCTYPE html> 
    <html lang="en"> 
    <head> 
        <meta charset="utf-8"> 
        <title>Web App</title> 
    </head> 
    <body> 
      <span id="txtlog"></span> 
      <img alt="Evil Picture" src="http://evil.com/pic.jpg"> 
      <script> 
          alert('This does not get executed!') 
      </script> 
      <script src="http://evil.com/evilstuff.js"></script> 
      <script nonce="${suid}"> 
          document.getElementById('txtlog') 
            .innerText = 'Hello World!' 
        </script> 
      </body> 
    </html> 
  `)
})

app.listen(
  1337,
    () => console.log('Listening on port 1337')
)

