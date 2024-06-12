const express = require('express');
const {createNote,deletNote,editNote,getNotes} = require('../controllers/noteController');

const checkToken = require('../middleware/auth');


const router = express.Router();

router.get('/',checkToken,getNotes);

router.post('/',checkToken,createNote);

router.delete('/:id',checkToken,deletNote);


router.put('/:id',checkToken,editNote);



module.exports = router;