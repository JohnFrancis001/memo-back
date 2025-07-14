const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
        author: {type: String, required: true},
        title: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        file: {type: String},
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Note', noteSchema);
