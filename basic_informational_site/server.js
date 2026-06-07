const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  filePath = '';

  if (req.url === '/') {
    filePath = 'index.html'
  }
  else if (req.url === '/about') {
    filePath = 'about.html'
  }
  else if (req.url === '/contact-me') {
    filePath = 'contact-me.html'
  }
  else {
    filePath = '404.html'
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.write(data)
    res.end()
  })

})

server.listen(8080)




