const express = require('express')

const PostCtrl = require('../controllers/posts-ctrl')
//const app = express()
const router = express.Router()

router.post('/admin/post', PostCtrl.createPost, (req, res) => {
    res.redirect("/admin")
})
router.put('/admin/post/:id', PostCtrl.updatePost)
router.delete('/admin/post/:id', PostCtrl.deletePost)
router.get('/admin/post/:id', PostCtrl.getPostById)
router.get('/admin', PostCtrl.getPosts)
router.get("/blog", PostCtrl.getPosts)
router.get("/blog/post/:id", PostCtrl.updatePost)

module.exports = router
