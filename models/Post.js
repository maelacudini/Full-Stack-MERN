const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    likes: [
        {
            profile: {
                type: Schema.Types.ObjectId
            }
        }
    ],
    comments: [
        {
            profile: {
                type: Schema.Types.ObjectId
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', PostSchema);