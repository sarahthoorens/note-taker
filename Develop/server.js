const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const PORT = 3001;

const app = express();


// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// `GET /` returns the `index.html` file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
// `GET /notes` returns the `notes.html` file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// `GET /api/notes` reads the `db.json` file and returns all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  console.log('is this working?')
  console.info(`${req.method} request received.`);
    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {    
        const allNotes=JSON.parse(data);
        res.json(allNotes);
      }   
    })
  });


// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note.`);

    // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // Check if there is anything in the response body
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    // Obtain existing notes
       fs.readFile('./db/db.json', 'utf8', (err, note) => {
          if (err) {
            console.error(err);
          } else {
          const parsedNotes = JSON.parse(note);
          parsedNotes.push(newNote)
          

              // Write updated note back to the file
          fs.writeFile('./db/db.json',JSON.stringify(parsedNotes, null, 4),
          (writeErr) => writeErr ? console.error(writeErr)
          : console.info('Successfully added new note!')
          );
        }
      });
          const response = {
              status: 'success',
              body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  }
  else {
    res.status(500).json('Note must contain title and text.')
  }
});

//  Return the `index.html` file for random queries.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

  app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}`)
);

