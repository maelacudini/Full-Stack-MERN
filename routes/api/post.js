const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const checkObjectId = require('../../middleware/checkObjectId');



// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
    '/',
    auth,
    check('text', 'Text is required').notEmpty(),
    check('image', 'Image is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const profile = await Profile.findById(req.profile.id).select('-password');
            console.log(profile);

            const newPost = new Post({
                text: req.body.text,
                name: profile.name,
                avatar: profile.avatar,
                image: req.body.image,
                profile: profile._id, // Set the profile field to the profile's ID
            });

            const post = await newPost.save();

            // Update the associated profile with the new post's ID
            await Profile.findOneAndUpdate(
                // { user: req.user.id },
                { $push: { posts: post._id } }
            );

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    GET api/profile/:profile_id/posts
// @desc     Get all posts of a profile
// @access   Public
router.get('/:profile_id/posts', async (req, res) => {
    try {
        const posts = await Post.find({ profile: req.params.profile_id }).sort({
            date: -1
        });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



// @route    DELETE api/posts
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if the post exists
        if (!post) {
            return res.status(404).json({ msg: 'Post not found.' });
        }

        //check on the user
        if (post.profile.toString() !== req.profile.id) {
            return res.status(404).json({ msg: 'User not authorized.' });
        }

        await post.deleteOne();

        res.json({ msg: 'Post removed.' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server Error');
    }
})



// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.some((like) => like.profile.toString() === req.profile.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ profile: req.profile.id });

        await post.save();

        return res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has not yet been liked
        if (!post.likes.some((like) => like.profile.toString() === req.profile.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // remove the like
        post.likes = post.likes.filter(
            ({ profile }) => profile.toString() !== req.profile.id
        );

        await post.save();

        return res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    PUT api/posts/comment/:id
// @desc     Comment single post
// @access   Private
router.put('/comment/:id', [auth, [
    check('text', 'Text is required').trim().notEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const profile = await Profile.findById(req.profile.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = ({
            text: req.body.text,
            name: profile.name,
            avatar: profile.avatar,
            profile: req.profile.id
        });

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.profile.toString() !== req.profile.id) {
            return res.status(401).json({ msg: 'profile not authorized' });
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});


module.exports = router;