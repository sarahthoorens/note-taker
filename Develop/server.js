const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const savedNoteData = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = 3001;


// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// `GET /notes` returns the `notes.html` file.
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

// "`GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    // Obtain existing note
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNote = JSON.parse(data);
       
    }   return res.status(201).json(parsedNote) ;
    })
  });
       

app.get('/api/notes/:term', (req, res) => {
    const noteRequested = req.params.term.toLowerCase();

    for (let i = 0; i < savedNoteData.length; i++) {
        if (noteRequested === savedNoteData[i].title.toLowerCase()) {
            return res.json(savedNoteData[i]);
        }
    }
    return res.json('No note found')
});

//* `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  	
console.log(req.body);
    // Log that a POST request was received
      console.info(`${req.method} request received to add a new note`);
   
    const { title, text } = req.body;

    // Check if there is anything in the response body
    if (title && text) {

      const newNote = {
        title,
        text,
        note_id: uuid,
      };
  
        // Add a new note
        parsedNote.push(newNote);

        // Write updated note back to the file
        fs.writeFile('./db/db.json',JSON.stringify(parsedNote, null, 4),
          (writeErr) => writeErr ? console.error(writeErr)
              : console.info('Successfully added new note!')
        );
      }
    });

      const response = {
        status: 'success',
        // body: newNote,
      };
      console.log(response);
    //   res.status(201).json(response);
    //  else {
    //   res.status(500).json('Note must contain title and text.');
    // }
  
    // Log the response body to the console
    console.log(req.body);

  
  // Return the `index.html` file.
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
  app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}`)
);
