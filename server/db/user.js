// Schema for logged in users.
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    githubId: Number,
    login: String,
    name: String,
    html_url: String,
    accessToken: String,
});


const User = mongoose.model('User', userSchema);


module.exports.User = User;
