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
}, { timestamps: { updatedAt: 'recordUpdated_at', createdAt: 'recordCreated_at' } });

repositorySchema.statics.updateRepoWithStargazer = function (repo, stargazer) {
    const Repository = this;

    return new Promise((resolve, reject) => {
        Repository.findOne({ githubId: repo.githubId })
                .then((repository) => {
                    if (repository) {
                        if (repository.stargazersLogin.indexOf(stargazer) === -1) {
                            repository.stargazersLogin.push(stargazer);
                        }
                        Object.assign(repository, repo);
                        repository.save((error, doc) => {
                            if (error) throw error;
                            console.log(`Updated: ${repo.name} from: ${stargazer}`);
                        });
                    } else {
                        repository = new Repository(repo);
                        repository.stargazersLogin.push(stargazer);
                        repository.save((error, doc) => {
                            if (error) throw error;
                            console.log(`Added: ${repo.name} from: ${stargazer}`);
                        });
                    }
                    resolve(repository);
                })
                .catch(e => reject(e));
    });
};

const Repository = mongoose.model('Repository', repositorySchema);

module.exports.Repository = Repository;
