const  mongoose = require('mongoose');
const UserModel = require('../models/userModel')

const noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required:true
    }
},{timestamps:true});


const noteModel = mongoose.model('NoteModel',noteSchema);

module.exports = noteModel;