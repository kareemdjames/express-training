const express = require('express')
app = express()

const miniapp = express.Router()
miniapp.get('/home', (req, res, next) => {
  const url = req.originalUrl
  res
    .status(200)
    .send(`You are visiting /home from ${url}`)
})

app.use('/first', miniapp)
app.use('/second', miniapp)

app.listen(
  1337,
    () => console.log('Server runing on port 1337')
)