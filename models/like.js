const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const likeSchema = new mongoose.Schema({
    postId: {
        type: ObjectId,
        ref: 'Post'
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

module.exports = mongoose.model('Like', likeSchema);