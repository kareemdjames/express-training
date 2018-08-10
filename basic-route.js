const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.status(200).send('Hello from ExpressJS')
})

app.listen(
  1337,
    () => console.log('Server running on port 1337'),
)

