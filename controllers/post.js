const Post = require('../models/post');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getPostById = (req, res, next, id) => {
    Post.findById(id)
        .exec((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: "Post not found"
                })
            }
            req.post = post;
            next();

        })
}

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }

        const { description } = fields;
        const { photo } = files;
        if (!description && !photo) {
            return res.status(400).json({
                error: 'Please add atleast a description or a photo'
            });
        }

        let post = new Post(fields);
        if (files.photo) {
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: 'File size too big!'
                });
            }
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
            post.postedBy = req.profile._id;
        }

        post.save((err, post) => {
            if (err || !post) {
                res.status(400).json({
                    error: 'Updation of post failed!'
                });
            }
            res.json(post);
        })

    });
}

exports.getPost = (req, res) => {
    req.post.photo = undefined;
    return res.json(req.post);
}

// middleware
exports.photo = (req, res, next) => {
    if (req.post.photo.data) {
        res.set("Content-Type", req.post.photo.contentType);
        return res.send(req.post.photo.data);
    }
    next();
}

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, deletedPost) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the post"
            })
        }
        res.json({
            message: "Post deleted successfully"
        })
    })
}