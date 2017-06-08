const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('./db/user');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'see_sample.env_file',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'see_sample.env_file',
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate(profile, accessToken).then((user) => {
        done(null, user);
    })
    .catch((err) => {
        done(err, null);
    });
}));


module.exports.passport = passport;