const express = require('express');
const router = express.Router();


const AuthorController = require('../controllers/authorController')
const BlogController = require('../controllers/blogController')
const Midd = require('../middleware/authMiddleware')


router.post("/authors", AuthorController.createAuthor)
router.post("/blogs", Midd.middleWare, BlogController.createBlog)
router.get("/blogs", Midd.middleWare, BlogController.fetchBlogs)
router.put("/blogs/:blogId", Midd.middleWare, BlogController.updateBlog)
router.delete("/blogs/:blogId", Midd.middleWare, BlogController.deleteById)
router.delete("/blogs", Midd.middleWare, BlogController.deleteByQuery)
router.post("/login", AuthorController.login)

module.exports = router;