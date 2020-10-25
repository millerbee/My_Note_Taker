const express = require("express");
var path = require("path");
var app = express();
fs = require("fs");
module.exports = app;
var PORT = process.env.PORT || 8080;  
let newNote =[];

//having some issues with code and deploy....

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public')); 
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'assets')));
//app.use('/static', express.static('public'))

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


app.post("/api/notes", function(req, res) {
    try {
      // reads the json file
     newNote = fs.readFileSync("db.json", "utf8");
      console.log(newNote);
  
      // parse the data to get an array of objects
      newNote = JSON.parse(newNote);
      req.body.id = newNote.length;
      newNote.push(req.body); 
      newNote= JSON.stringify(newNote);
      fs.writeFile("db.json", newNote, "utf8", function(err) {
        
        if (err) throw err;
      });
      
      res.json(JSON.parse(newNote));
  
      // error Handling
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/api/notes", function(req, res) {
    try {
      newNote = fs.readFileSync("db.json", "utf8");
      console.log("app starting");
     
      newNote = JSON.parse(newNote);
  

    } catch (err) {
      console.log(err);
    }
  
    res.json(newNote);
  });


  app.delete("/api/notes/:id", function(req, res){
      var deleteNote = newNote["newNote", + req.body.id];
      delete newNote["newNote", + req.body.id];
      res.end( "Deleted note: \n" + JSON.stringify(deleteNote, null, 2));
    });



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });