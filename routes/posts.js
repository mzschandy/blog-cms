const express = require('express')
const Post = require("../models/post.model")
const multer = require("multer")

//const PostCtrl = require('../controllers/posts-ctrl')
//const app = express()
const router = express.Router()

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req, file)
        const isValid = MIME_TYPE_MAP[file.mimetype];

        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");

        console.log(name)
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});

/*
router.post('/admin/post', PostCtrl.createPost, (req, res) => {
    res.redirect("/admin")
})
router.put('/admin/post/:id', PostCtrl.updatePost)
router.delete('/admin/post/:id', PostCtrl.deletePost)
router.get('/admin/post/:id', PostCtrl.getPostById)
router.get('/admin', PostCtrl.getPosts)
router.get("/blog", PostCtrl.getPosts)
router.get("/blog/post/:id", PostCtrl.updatePost)*/


//Create Post
router.post('/admin/post', multer({storage: storage}).single("image"), (req, res) => {
    const body = req.body
    console.log("body", body)
    const url = req.protocol + "://" + req.get("host")
    console.log("url", url)

    if (!body) {
        console.log(body)
        return res.status(400).json({
            success: false,
            error: 'You must create a post',
        })
    }

    console.log("file object", req.file)
    //console.log("file name", req.file.filename)

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url +"/images/" + req.file.filename,
        blurb: req.body.blurb,
        postBy: req.body.postBy,
    })

    if (!post) {
        return res.status(400).json({ success: false, error: err })
    }
    console.log(post)

    post.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                message: 'Post created!',
            })
            
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })
    //res.redirect("/admin")
})

//Update post
router.put("/admin/post/:id",multer({storage: storage}).single("image"), (req, res) => {
    const body = req.body
    let imagePath = req.body.imagePath

    if(req.file) {
        const url = req.protocol + "://" + req.get("host")
        imagePath = url + "/images/" + req.file.filename
    }

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Post not found!',
            })
        }
        post.title = body.title
        post.blurb = body.blurb
        post.imagePath = body.imagePath,
        post.content = body.content
        post.postBy = body.postBy

        console.log("post")
        
        post
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: post._id,
                    message: 'Post updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'post not updated!',
                })
            })
    })
    //res.redirect("/posts/list")
})

//delete Post
router.delete("/admin/post/:id", (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res
                .status(404)
                .json({ success: false, error: 'post not found' })
        }

        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err)) 
})

//get Post by ID
router.get("/admin/post/:id", (req, res) => {
    Post.findById(req.params.id).then(post => {
        console.log(post)
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found!"
            });
        }
    });
})

//get Post by ID blog
router.get("/blog/post/:id", (req, res) => {
    /*
    Post.findOne({ _id: req.params.id }, (err, post) => {
        console.log(post)
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err))*/
    Post.findById(req.params.id).then(post => {
        console.log(post)
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found!"
            });
        }
    });
})
//get all posts admin
router.get("/admin", (req, res) => {
    /*
    Post.find({}, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Post not found' })
        }
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))*/
    Post.find().then(posts => {
        if (posts) {
            res.status(200).json({
                message: "Poasts fetched successfully!",
                posts: posts
            })
        } else {
            res.status(404),json({
                message: "posts not found"
            })
        }
    })
})

router.get("/blog", (req, res) => {
    Post.find().then(posts => {
        if (posts) {
            res.status(200).json({
                message: "Poasts fetched successfully!",
                posts: posts
            })
        } else {
            res.status(404),json({
                message: "posts not found"
            })
        }
    })
})

module.exports = router
