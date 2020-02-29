import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: true
    }
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function (next) {

    const user = this;

    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) { return next(); }

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if (err) { return next(err); }

        // @ts-ignore
        bcrypt.hash(user.password, salt, (err: any, hash) => {

            if (err) { return next(err); }
            // @ts-ignore
            user.password = hash;
            next();

        });

    });

});

UserSchema.methods.checkPassword = function (attempt, callback) {

    const user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });

};
