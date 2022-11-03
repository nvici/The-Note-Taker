const router = require('express').Router();
const path = require('path');
//Import the modular routers for /public/notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

module.exports = router;