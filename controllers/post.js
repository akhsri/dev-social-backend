const Post = require('../models/post');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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