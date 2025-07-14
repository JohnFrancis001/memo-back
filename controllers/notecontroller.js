const Note = require('../models/note');

// Controller to add note
const addNote = async (req, res) => {
    try{
        const authName = req.user.name;
        console.log(authName);
        const { title, description, file } = req.body;
        if( !authName || !title || !description) return res.status(400).json({message: "Field Required"});
        const note = new Note({
            author: authName,
            title,
            description,
            file: file || null
        });
        if(!note) return res.status(400).json({message: "Error Message"});
        await note.save();
        res.status(200).json({message: "Note Created"});
    }catch(e){
        res.status(400).json({message: "Server Error"});
    }
}

// Controller to delete the selected note
const deleteNote = async (req, res) => {
    try{
        const id  = await req.params.id;
        const name  = req.user.name;
        if(!id) return res.status(422).json({message: "Note not found"});
        // Provide name and id both in frontend while making a request for deleting it.
        const note = await Note.findByIdAndDelete({ _id: id, author: name });
        if(!note) return res.status(400).json({message: "Note not deleted"});
        res.status(200).json({message: "Note Deleted Successfully"});
    }catch(e){
        res.status(400).json({message: "Server Error"});
    }
}

module.exports = {addNote, deleteNote};
