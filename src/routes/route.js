const express = require('express');

const router = express.Router();

const usercontroller=require("../controllers/userController")
const bookcontroller=require("../controllers/cartController")
const Reviewcontroller=require("../controllers/orderController")
const Middleware=require("../middleware/Authentication")
const ProductController = require("../controllers/productController")


//USER API
router.post('/User',usercontroller.registerUser)
router.post('/login',usercontroller.login)
router.get('/user/:userId/profile',Middleware.Auth,usercontroller.GetUsers)
router.put('/user/:userId/profile',Middleware.Auth,usercontroller.UpdateUser)
// Product APIs

router.post('/products', ProductController.CreateProduct)
router.get('/products', ProductController.GetProducts)
router.get('/products/:productId', ProductController.GetWithProductId)
router.put('/products/:productId', ProductController.updateProduct)
router.delete('/products/:productId', ProductController.deleteProduct)
module.exports = router;