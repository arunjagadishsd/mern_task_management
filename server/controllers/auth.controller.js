const jwt = require('jwt-simple');
const User = require('../models/user.model');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, process.env.SECRET);
}

// eslint-disable-next-line no-unused-vars
exports.signin = function(req, res, next) {
    res.send({
        token: tokenForUser(req.user)
    });
}

exports.signup = async (req, res, next) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName
        } = req.body;
        console.log({
            email,
            password,
            firstName,
            lastName
        });

        if (!email || !password) {
            return res.status(422).send({
                error: 'You must provide email and password'
            });
        }
        const existingUser = await User.findOne({
            email: email
        })
        console.log('existingUser', existingUser);

        if (existingUser) {
            return res.status(422).send({
                error: 'Email is in use'
            });
        }
        console.log('b4createdUser');

        const createdUser = await User.create({
            email,
            password,
            firstName,
            lastName
        })
        console.log('createdUser', createdUser);

        res.json({
            token: tokenForUser(createdUser)
        });
    } catch (error) {
        return next(error);
    }

}