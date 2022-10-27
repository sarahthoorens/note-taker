const express = require('express');
const path = require('path');
const savedNoteData = require('./db/db.json');

const PORT = 3001;
const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/assets/index.html') 
// );
// console.log('should be index')}
// );



// `GET /notes` returns the `notes.html` file.
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

// "`GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(savedNoteData)
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
    // Log that a POST request was received
    console.info(`${req.method} request received to add a new note`);
  
    // Prepare a response object to send back to the client
    let response;
  
    // Check if there is anything in the response body
    if (req.body && req.body.title && req.body.text) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.json(`New Note has been added!`);
    } else {
      res.json('Note must contain title and text.');
    }
  
    // Log the response body to the console
    console.log(req.body);
  });
  
  // Return the `index.html` file.
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
  app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}`)
);
