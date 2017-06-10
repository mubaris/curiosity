// Schema of stargazers in Github
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const stargazersSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    githubId: Number,
    login: String,
    name: String,
    html_url: String,
    location: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    dbLastUpdated: Date,
    starredIds: [mongoose.Schema.Types.ObjectId],
});


const Stargazers = mongoose.model('Stargazers', stargazersSchema);

module.exports.Stargazers = Stargazers;
