const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller to update the note
const updNote = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const name = req.user.name;
        const { title, description } = req.body;
        // // Provide name and id both in frontend while making a request for updating it.
        const note = await Note.findByIdAndUpdate( {_id: id, author: name }   , {
            title,
            description,
        }, { new: true });
        if(!note) return res.status(400).json({message: "Note not saved!"});
        res.status(200).json({message: "Success Update"});
    }catch(e){
        res.status(400).json({message: "Server Error while updating"});
    }
}

// Controller to update the user and re-initialize the JWt token
const userUpd = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, email, password } = req.body;

        // Fetch existing user data first
        const existingUser = await User.findById(id);
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const updates = {};

        // Use new value if not empty, otherwise keep old
        updates.name = name && name.trim() !== '' ? name : existingUser.name;
        updates.email = email && email.trim() !== '' ? email : existingUser.email;
        if (password && password.trim() !== '') {
            updates.password = await bcrypt.hash(password, 10);
        } else {
            updates.password = existingUser.password;
        }

        const updUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updUser) return res.status(400).json({ message: "User not updated successfully!" });

        // Update notes if name was changed
        if (existingUser.name !== updates.name) {
            await Note.updateMany(
                { author: existingUser.name },
                { $set: { author: updates.name } }
            );
        }

        const payload = {
            id: updUser._id,
            name: updUser.name,
            email: updUser.email
        };

        const token = jwt.sign(payload, process.env.sign, {
            expiresIn: '1h',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000,
        });

        res.status(200).json({ message: "User Updated Successfully" , token});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = {updNote, userUpd};