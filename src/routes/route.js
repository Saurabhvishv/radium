const express = require('express');
const usercontroller=require("../controllers/userController")
const router = express.Router();
const Middleware=require("../middlewares/Authentication")

const userController = require('../controllers/userController');
const midd=require('../middlewares/Authentication')

// user routes
router.post('/User',usercontroller.registerUser)
router.post('/login',usercontroller.login)
router.get('/user/:userId/profile',Middleware.Auth,usercontroller.GetUsers)
router.put('/user/:userId/profile',Middleware.Auth,usercontroller.UpdateUser)


module.exports = router;