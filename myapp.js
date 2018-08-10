const express = require('express')
const app = express()
const debug = require('debug')('myapp')

app.get('*', (req, res, next) => {
  debug('Request:', req.originalUrl)
  res.send('Hello there!')
})

app.listen(
  1337,
    () => console.log('Server listening on port 1337')
)