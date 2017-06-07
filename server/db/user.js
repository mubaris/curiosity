// Schema for logged in users.
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    githubId: Number,
    login: String,
    name: String,
    html_url: String,
    avatar_url: String,
    accessToken: String,
});

userSchema.statics.findOrCreate = function (profile, accessToken) {
    const User = this;
    return User.findOne({ githubId: profile.id }).then((user) => {
            // If user found return that user info
        if (user) {
                // TODO:Need to update accessToken for this user
            user.accessToken = accessToken;
            return Promise.resolve(user);
        }
            // Create new user
        const NewUser = new User({
            githubId: profile.id,
            login: profile._json.login,
            name: profile._json.name,
            avatar_url: profile._json.avatar_url,
            html_url: profile._json.html_url,
            accessToken,
        });

        return NewUser.save();
    }).catch(err => Promise.reject(err));
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;
