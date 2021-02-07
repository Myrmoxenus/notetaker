//Dependencies
const fs = require('fs')
const express = require('express')
const path = require('path')
//Initializes the variable "app" with express()
const app = express()
//Sets port to a value
const PORT = process.env.PORT || 1138
//Listens, reports to console that a server has successfully started on PORT
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
//Body Parser Middleware
//Tells app to parse incoming JSON and form submissions prior to interacting with handler functions(?)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Sets up static folder
app.use(express.static(path.join(__dirname, 'public'),{extensions:['html']}))
//????????
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index')))

