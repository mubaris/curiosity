const request = require('request');
const { logger } = require('./../../config/winston');

const gitService = {

    getUserDetails(login, token) {
        if (token) {
            headers = {
                'User-Agent': 'request',
                Authorization: `token ${token}`,
            };
        } else {
            headers = {
                'User-Agent': 'request',
            };
        }
        const options = {
            url: `https://api.github.com/users/${login}`,
            headers,
        };
        return new Promise((resolve, reject) => {
            logger.info('Calling api.github.com/users/user', { login });
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const user = JSON.parse(body);
                    const stargazer = {
                        githubId: user.id,
                        login: user.login,
                        name: user.name,
                        html_url: user.html_url,
                        location: user.location,
                        bio: user.bio,
                        public_repos: user.public_repos,
                        public_gists: user.public_gists,
                        followers: user.followers,
                    };
                    resolve(stargazer);
                } else {
                    logger.warn('Error api.github.com/users/user', { Error: response.body });
                    reject(response.body);
                }
            });
        });
    },

    getStarredRepository(login, token, page = 1) {
        if (token) {
            headers = {
                'User-Agent': 'request',
                Authorization: `token ${token}`,
            };
        } else {
            headers = {
                'User-Agent': 'request',
            };
        }
        const options = {
            url: `https://api.github.com/users/${login}/starred?per_page=100&page=${page}`,
            headers,
        };
        return new Promise((resolve, reject) => {
            logger.info('Calling api.github.com/users/login/starred', { login, page });
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const repos = JSON.parse(body);
                    // Only select required info from data received.
                    const filterRepos = repos.map(repo => ({
                        githubId: repo.id,
                        name: repo.name,
                        html_url: repo.html_url,
                        description: repo.description,
                        stargazers_count: repo.stargazers_count,
                        forks_count: repo.forks_count,
                        created_at: repo.created_at,
                        updated_at: repo.updated_at,
                        language: repo.language,
                    }));
                    logger.debug('Data Received:', { login, length: filterRepos.length, currentPage: page });
                    resolve(filterRepos);
                } else {
                    logger.warn('Error api.github.com/users/login/starred', { err: response.body });
                    reject(response.body);
                }
            });
        });
    },
};

module.exports.gitService = gitService;
