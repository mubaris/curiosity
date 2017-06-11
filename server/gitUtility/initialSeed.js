require('./../../config/config');
const { gitService } = require('./gitService');
const { Stargazers } = require('./../db/stargazers');
const { Repository } = require('./../db/repositories');
const { stargazerList } = require('./stargazerList');
const { logger } = require('./../../config/winston');

// stargazerList = ['Kureev', 'yyx990803'];

function seedStargazerRecords(token) {
    // Get List from stargazerList.js and update records for stargazer.
    for (const stargazer of stargazerList) {
        logger.info(`*****Getting Record for stargazer:${stargazer}*****`);
        gitService.getUserDetails(stargazer, token).then((user) => {
            Stargazers.findOneAndUpdate({ login: user.login }, user,
                                        { new: true, upsert: true },
                                        (error, doc) => {
                                            if (error) throw error;
                                            //logger.debug(`Updated: ${stargazer}`);
                                        });
        }).catch(e => logger.error(e));
    }
    logger.info('*_*_*_*_*Stargazer collection is updated.*_*_*_*_*');
}

function seedRepositoryRecords(token) {
    // Get List from stargazerList.js and update records for Starred Repos.
    for (const stargazer of stargazerList) {
        logger.info(`*****Getting Starred Repos of:${stargazer}*****`);
        getRepositoryRecord(stargazer, token);
    }
}

function getRepositoryRecord(stargazer, token, page = 1) {
    gitService.getStarredRepository(stargazer, token, page).then((repos) => {
        if (repos.length === 100) {
        // If repos.length is 100 there might be another page of data to calling for next page.
            page += 1;
            getRepositoryRecord(stargazer, token, page);
        }
        for (const repo of repos) {
        // Calling static method of Repository modal to store repos and update stargazersLogin array.
            Repository.updateRepoWithStargazer(repo, stargazer)
                          .catch(e => console.log(e));
        }
    });
}

updateRecords = function updateRecords(token) {
    seedStargazerRecords(token);
    seedRepositoryRecords(token);
};

module.exports.updateRecords = updateRecords;
