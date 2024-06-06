const express = require('express')
const minh = express()
const port = 3000
const path = require('path')
minh.use(express.static('public'))

minh.get('/', (req, res) => {
    res.send('Hello World!')
})

minh.get('/about', (req, res) => {
    res.send('This is about page')
})
//
minh.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname,'contact.html'))
})

minh.get('*',function(req, res) {
    res.header(404)
    res.send('Page not found')
})
  
minh.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})