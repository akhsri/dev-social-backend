const Like = require('../models/like');

exports.getLikeById = (req, res, next, id) => {
    Like.findById(id)
        .exec((err, like) => {
            if (err) {
                return res.status(400).json({
                    error: 'Like not found'
                })
            }
            req.like = like;
            next();
        })
}

exports.createLike = (req, res) => {
    //console.log('req: ', req);
    Like.findOne({ postId: req.body.postId, postedBy: req.profile._id })
        .exec((err, existingLike) => {
            if (existingLike) {
                return res.status(409).json({
                    error: 'Like already exist for this post by the user'
                })
            }
            const like = new Like(req.body);
            //console.log('like: ', like);

            like.postedBy = req.profile._id;
            like.save((err, like) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Not able to save Like in DB'
                    })
                }
                return res.json(like);
            })
        })

}

exports.getLike = (req, res) => {
    return res.json(req.like);
}

exports.getAllLikesByPostId = (req, res) => {
    // console.log('getAllLikesByPostId called ')
    // console.log('req: ', req.params);
    //return res.json({ "msg": 'ok' })
    Like.find({ postId: req.params.postId })
        .exec((err, likes) => {
            if (err) {
                return res.status(400).json({
                    error: 'An error occured while fetching likes'
                })
            }
            res.json({ likes });
        })
}



exports.deleteLike = (req, res) => {

    Like.findOneAndDelete({ _id: req.params.likeId, postedBy: req.params.userId })
        .exec((err, deletedProduct) => {
            if (err) {
                return res.status(400).json({
                    error: 'Failed to delete Like'
                });
            }
            res.status(204).json({
                message: 'Like deleted successfully'
            })
        })
}

