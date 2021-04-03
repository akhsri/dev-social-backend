const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const commentSchema = new mongoose.Schema({
    postId: {
        type: ObjectId,
        ref: 'Post'
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
    },
    description: {
        type: String,
        require: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema);