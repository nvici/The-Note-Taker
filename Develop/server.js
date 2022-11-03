const PORT = process.env.PORT || 1234;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const ourNotes = require('./db/db.json');
//const api_routes = require('./routes/api-routes');
// const note_routes = require('./routes/note-routes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use('/api', api_routes);
//app.use('/notes', note_routes);


//GET route for homepage
app.get('/api/notes', (req, res) => {
    res.json(ourNotes.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//POST request to add notes
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, ourNotes);
    res.json(newNote);
});
//DELETE request to delete Notes
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, ourNotes);
    res.json(true);
});
//function to create new notes
function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

//fucntion to delete note
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

//Listening to PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});