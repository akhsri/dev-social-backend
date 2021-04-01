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
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: String,
        postedBy: {
            type: object,
            ref: 'User'
        }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);