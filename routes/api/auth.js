const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profile = require('../../models/Profile');



//@route    GET api/auth
//@desc     get user by token
//@access   private
router.get('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.profile.id).select('-password');
        res.json(profile);
    } catch (error) {
        console.error(error.msg);
        res.status(500).send('Server error');
    }
});



//@route    POST api/auth
//@desc     authenticate user and get token
//@access   public
router.post('/', [
    check('email', 'Valid email is required.').isEmail(),
    check('password', 'Password is required.').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //check if user exists
        let profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
        };

        //compare user and password
        const isMatch = await bcrypt.compare(password, profile.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
        }

        //reurn json webtocken
        const payload = {
            profile: {
                id: profile._id,
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