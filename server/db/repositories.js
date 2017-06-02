// Repositories
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const repositorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    html_url: String,
    description: String,
    stargazers_count: Number,
    forks_count: Number,
    created_at: Date,
    updated_at: Date,
    language: String,
});


const Repository = mongoose.model('Repository', repositorySchema);

module.exports.Repository = Repository;
