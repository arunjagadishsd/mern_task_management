const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    Schema,
    model
} = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})
userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        console.log('userSchema', salt);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log('hash', hash);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
}

module.exports = User = model('User', userSchema)