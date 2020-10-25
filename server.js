const express = require("express");
var path = require("path");
var app = express();
fs = require("fs");
module.exports = app;
const bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;  
let newNote =[];

//having some issues with code and deploy....

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public')); 

// get the html pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, + 'index.html'));
    
});
app.get('/', function (req, res) {
  res.render('index', {});
});

const htmlRouter = express.Router();
htmlRouter.route('/notes')
.get((req, res) => {
    res.sendFile(path.join(__dirname + 'notes.html'));
});

//create a note
app.post("/api/notes", function(req, res) {
    try {
     
      newNote = fs.readFileSync("db.json", "utf8");         //initially didn't add utf8 and though the app worked the console shows this
      console.log(newNote);                                // <Buffer 5b 7b 22 74 69 74 6c 65 22 3a 22 42 75 79 20 43 68 69 70 73 22 2c 22 74 65 7..........180 more bytes>    
      newNote = JSON.parse(newNote);
      req.body.id = newNote.length;
      newNote.push(req.body); 
      newNote= JSON.stringify(newNote);
      fs.writeFile("db.json", newNote, "utf8", function(err) {        
        if (err)  
        console.log(err);
      });
      
      res.json(JSON.parse(newNote));
    } catch (err) {
      console.error(err);
    }

     console.log("note added");
  });

  // get the notes already logged, this won't error if there are no notes.
  app.get("/api/notes", function(req, res) {
    try {
      newNote = fs.readFileSync("db.json", "utf8");     
      newNote = JSON.parse(newNote);
  

    } catch (err) {
      console.log(err);
    }
  
    res.json(newNote);
   
  });

// delete a note
  app.delete("/api/notes/:id", function(req, res){
    try{
      let id = req.params.id;
      newNote = fs.readFileSync("db.json", "utf8");
      newNote = JSON.parse(newNote);
      newNote = newNote.filter(function(note) {    // here is where the delete occurs, it will delete the note the user selects in the array one at a time with trashcan icon.
        return note.id != req.params.id;
        
      });
      newNote = JSON.stringify(newNote);
      fs.writeFile("db.json", newNote, "utf8", function(err) {     //re writing the file
       
        if (err) 
        console.log(err);
      }); 
    
    } catch (err) {
      console.log(err);
    }

    console.log("note deleted")
    res.send(JSON.parse(newNote));

  });

// open the port
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  