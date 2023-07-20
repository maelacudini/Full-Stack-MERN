const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Post = require('../../models/Post');



// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.profile.id);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    GET api/edit/:id
// @desc     Edit profile
// @access   Private
router.put('/edit/:id', auth, async (req, res) => {
    // Destructure the request
    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // Spread the rest of the fields we don't need to check
        ...rest
    } = req.body;

    try {
        // Find the profile by ID
        let profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        // Update the profile fields
        profile.website = website || profile.website;
        profile.skills = skills || profile.skills;

        // Update the social fields
        profile.social.youtube = youtube || profile.social.youtube;
        profile.social.twitter = twitter || profile.social.twitter;
        profile.social.instagram = instagram || profile.social.instagram;
        profile.social.linkedin = linkedin || profile.social.linkedin;
        profile.social.facebook = facebook || profile.social.facebook;

        // Update the rest of the fields
        for (const field in rest) {
            profile[field] = rest[field];
        }

        // Save the updated profile
        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});



// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    GET api/profile/:profile_id
// @desc     Get profile by user id
// @access   Public
router.get('/:profile_id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.profile_id).select('-password');;

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found.' });
        };
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found.' });
        }
        res.status(500).send('Server Error');
    }
});



// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        await Promise.all([
            Post.deleteMany({ profile: req.profile.id }),
            Profile.findByIdAndRemove(req.profile.id)
        ]);

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
    '/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past')
        .notEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(req.body);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);



// @route    PUT api/profile/experience/:exp_id
// @desc     delete profile experience
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        //get profile of logged in user
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of the experience to be deleted
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})



// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
    '/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    PUT api/profile/education/:edu_id
// @desc     delete profile education
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        //get profile of logged in user
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of the education to be deleted
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})



//register profile
//@route    POST api/users 
//@desc     register profile
//@access   public
router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Valid email is required.').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, avatar } = req.body;

    try {
        //check if user exists
        let profile = await Profile.findOne({ email });
        if (profile) {
            return res.status(400).json({ errors: [{ msg: 'Profile already exists.' }] });
        };

        profile = new Profile({
            name,
            email,
            password,
            avatar
        })

        //encrypt psw
        const salt = await bcrypt.genSalt(10);
        profile.password = await bcrypt.hash(password, salt);

        await profile.save();

        //reurn json webtocken
        const payload = {
            profile: {
                id: profile.id,
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
})






module.exports = router;