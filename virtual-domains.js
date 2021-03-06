const express = require('express')
const vhost = require('vhost')
const app = express()

const app1 = express.Router()
const app2 = express.Router()

app1.get('/', (req, res, next) => {
  res.send('This is the main application')
})

app2.get('/', (req, res, next) => {
  res.send('This is the second application')
})

app.use(vhost('localhost', app1))
app.use(vhost('second.localhost', app2))

app.listen(
  1337,
    () => console.log('Server listening on port 1337')
)