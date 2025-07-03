const http = require('http')
const fs = require('fs')
const path = require('path')
const { error } = require('console')

const server = http.createServer((req, res) => {
console.log('Request for: ' + req.url)

let filePathh = ''

switch (req.url){
    case '/':
        filePathh = 'index.html'
        break
    case '/about' :
        filePathh = 'about.html'
        break
    case '/contact-me':
        filePathh = 'contactme.html'
        break
    default:
        filePathh = '404.html'

}

fs.readFile (__dirname, filePathh), (err, data){
    if(err){
        res.writeHead(500, {'Content-Tyoe': 'text/plain'})
        res.end('Server Error')
    }else{
        const statusCode = (filePathh === '404.html') ? 404 : 200
        res.writeHead(statusCode, {'Content-Type': 'text/html'})
        res.end(data)
    }
}

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/')
})

})