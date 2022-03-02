const express = require('express');

const router = express.Router();

const formController = require('../controllers/formController');

//create Form
router.post('/createForm', formController.createForm)
router.get('/getDetails', formController.getDetails)
router.put('/update/:formId', formController.updateForm)
router.delete('/delete/:formId', formController.deleteForm)

module.exports = router;