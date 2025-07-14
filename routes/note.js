const express = require('express');
const noteRout = express.Router();
const jwtAuth = require('../middleware/jwtauth');
const Note = require('../models/note');
const noteCont = require('../controllers/notecontroller');
const uptVerify = require('../middleware/updatemiddleware');
const updNote = require('../controllers/updatecontroller')

// Route to get the notes of only the current user
noteRout.get('/', jwtAuth, async (req, res) => {
    try{
        const name = req.user.name;
        console.log(name)
        const note = await Note.find({ author: name });
        if(!note) return res.status(400).json({message: "Empty"});
        res.status(200).json({message: "Success! Notes Found", note});
    }catch(e){
        res.status(500).json({message: "Server Error"});
    }
})

// Route to get all the notes of each user except for the current user
noteRout.get('/all', jwtAuth, async (req, res) => {
    try{
        const name = req.user.name;
        const note = await Note.find({ author: {$ne: name} });
        if(!note || note.length === 0) return res.status(400).json({message: "Empty"});
        res.status(200).json({message: "Success! Notes Found", note});
    }catch(e){
        res.status(500).json({message: "Server Error"});
    }
})

// Route to add new notes for the current user
noteRout.post('/add', jwtAuth, noteCont.addNote);

// Route to delete the note by its id selected from the front end
noteRout.delete('/delete/:id', jwtAuth, noteCont.deleteNote);

// Route to Update the note by its id selected from the front end
noteRout.put('/update/:id', jwtAuth, uptVerify, updNote.updNote );

module.exports = noteRout;
