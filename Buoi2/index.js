 const http = require('http')

 const server = http.createServer((req,res)=>{
    if (req.url === '/about')
        res.end("This is about page")
    else if (req.url === '/contact')
        res.end("This is contact page")
    else {
        res.writeHead(404)
        res.end("page not found")
    }
 })
 
 server.listen(3000)