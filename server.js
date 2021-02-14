//Dependencies
const fs = require('fs')
const express = require('express')
const path = require('path')
const noteDatabase = require(path.join(__dirname, 'db', 'db.json'))
//const controller = require(path.join(__dirname), controller.js)

//Initializes the variable "app" with express()
const app = express()

//Sets port to a value
const PORT = process.env.PORT || 1138

//Listens, reports to console that a server has successfully started on PORT
app.listen(PORT, function(){
 console.log(`server started on port ${PORT}`)
})

//Mounts express.json and express.urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Sets up static folder
app.use(express.static(path.join(__dirname, 'public'),{extensions:['html']}))

//Creates a class for note objects
class note {
    constructor (id, title, text){
        this.id = id
        this.title = title
        this.text = text
    }
}
//Reassings IDs of every note in database to correspond to its order
function reassign(){
    for(i=0;i<noteDatabase.length;i++){
        noteDatabase[i].id = i + 1
    }
}

//Handlers
//Parses the JSON of noteDatabase
app.get('/api/notes', function(req, res){
    res.json(noteDatabase)
})

//Creates a new note
app.post('/api/notes', function(req, res){
reassign()
noteDatabase.push(new note(noteDatabase.length,  req.body.title, req.body.text))
res.json(noteDatabase)
})

//Deletes selected note
app.delete('/api/notes/:id', function(req, res){
noteDatabase.splice(req.params.id, 1)
reassign()
res.json(noteDatabase)
})

//Routes everything else back to index.html
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Runs reassign at startup
reassign()