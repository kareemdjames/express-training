const express = require('express')
const app = express()

app.use((req, res, next) => {
  req.allowed = Reflect.has(req.query, 'allowme')
  next()
})

app.get('/', (req, res, next) => {
  if (req.allowed) {
    res.send('Hello secret world!')
  } else {
    res.send('You are not allowed to enter')
  }
})

app.listen(
  1337,
    () => console.log('Server listening on port 1337')
)