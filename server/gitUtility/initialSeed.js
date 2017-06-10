require('./../../config/config');
const { gitService } = require('./gitService');
const { Stargazers } = require('./../db/stargazers');
const { Repository } = require('./../db/repositories');
const { stargazerList } = require('./stargazerList');

const token = null;

function seedStargazerRecords() {
    for (const stargazer of stargazerList) {
        gitService.getUserDetails(stargazer, token).then((user) => {
            Stargazers.findOneAndUpdate({ login: user.login }, user,
                                        { new: true, upsert: true },
                                        (error, doc) => {
                                            if (error) throw error;
                                            console.log(`Updated: ${stargazer}`);
                                        });
        }).catch(e => console.log(e));
    }
}

function seedRepositoryRecords() {
    for (const stargazer of stargazerList) {
        gitService.getStarredRepository(stargazer, token).then((repos) => {
            for (const repo of repos) {
                Repository.updateRepoWithStargazer(repo, stargazer)
                          .catch(e => console.log(e));
            }
        });
    }
}

seedStargazerRecords();
//seedRepositoryRecords();
