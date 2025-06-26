const express=require('express')
const router=express.Router()
const userController = require('../controllers/userController');
const notesController = require('../controllers/noteController');
const auth=require('../middleware/auth')
router.post('/signup',userController.register)
router.post('/login',userController.login)
router.get('/notes',auth,notesController.getnotes)
router.post('/notes',auth,notesController.addnote)
router.put('/notes/:id',auth,notesController.updateNote)
router.delete('/notes/:id',auth,notesController.deleteNote)


module.exports=router;
