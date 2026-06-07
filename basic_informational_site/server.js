// const http = require('node:http')
// const fs = require('node:fs')

// const server = http.createServer((req, res) => {
//   filePath = '';
//
//   if (req.url === '/') {
//     filePath = 'index.html'
//   }
//   else if (req.url === '/about') {
//     filePath = 'about.html'
//   }
//   else if (req.url === '/contact-me') {
//     filePath = 'contact-me.html'
//   }
//   else {
//     filePath = '404.html'
//   }
//
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     res.write(data)
//     res.end()
//   })
//
// })
//
// server.listen(8080)


// Implementing above code in Express

const express = require('express')
const path = require('node:path')
const app = express()

const options = {
  root: path.join(__dirname)
}

app.get('/', (req, res) => {
  res.sendFile('index.html', options)
})

app.get('/about-me', (req, res) => {
  res.sendFile('about.html', options)
})

app.get('/contact-me', (req, res) => {
  res.sendFile('contact-me.html', options)
})

app.use((req, res) => { // use - will handle error in get/post/delete etc
  res.status(400).sendFile('404.html', options)
})

app.listen(3000, (err) => {
  if (err) throw err
  console.log('Server started on localhost port : 3000')
})
