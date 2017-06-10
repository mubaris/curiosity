// Repositories
const mongoose = require('./mongoose');

const Schema = mongoose.Schema;

const repositorySchema = new Schema({
    githubId: Number,
    name: String,
    html_url: String,
    description: String,
    stargazers_count: Number,
    forks_count: Number,
    created_at: Date,
    updated_at: Date,
    language: String,
    stargazersLogin: [String],
}, { timestamps: { updatedAt: 'recordLastModified_at' } });


const Repository = mongoose.model('Repository', repositorySchema);

module.exports.Repository = Repository;
