const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// C R U D
// Create - Read - Update - Delete
// Connect to DB

// client - server
// OOP
// node index.js