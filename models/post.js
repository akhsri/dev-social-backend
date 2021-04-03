const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    likesCount: {
        type: Number,
        ref: 'Like',
        default: 0,
    },
    commentsCount: {
        type: Number,
        ref: 'Comment',
        default: 0
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);