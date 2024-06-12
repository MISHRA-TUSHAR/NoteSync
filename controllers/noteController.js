const noteModel = require('../models/notesModel');
async function createNote(req,res){
    console.log('this is create note testing',req.userid);

    const {title,description} = req.body;
    if(!title || !description ){
        res.status(400).json({
            msg: "title description and userId are required"
        });
    }
    try{
        const newNote = new noteModel({
            title : title,
            description: description,
            userId: req.userid
        });
        await newNote.save();
        res.status(200).json({
            msg: "successfully created a new post",
            note: newNote
        });
    }catch(e){
        res.status(200).json({
            msg: "internal server error "
        });
    }
}
async function getNotes(req,res){
    console.log('this is get note testing', req.userid);

    try {
        const notes = await noteModel.find({ userId: req.userid });
        res.status(200).json({
            msg: "Successfully retrieved notes",
            notes: notes
        });
    } catch (e) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }

}
async function deletNote(req,res){
    const { id } = req.params;
    try {
        const note = await noteModel.findByIdAndDelete({ _id: id});
        if (!note) {
            return res.status(404).json({
                msg: "Note not found"
            });
        }
        res.status(200).json({
            msg: "Successfully deleted the note"
        });
    } catch (e) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}

async function editNote(req,res){

    console.log('this is edit note testing', req.params.id);

    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            msg: "Title and description are required"
        });
    }
    try {
        const updatedNote = await noteModel.findOneAndUpdate(
            { _id: id },
            { title: title, description: description },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({
                msg: "Note not found"
            });
        }
        res.status(200).json({
            msg: "Successfully updated the note",
            note: updatedNote
        });
    } catch (e) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }


}


module.exports = {
    createNote,
    getNotes,
    deletNote,
    editNote
}