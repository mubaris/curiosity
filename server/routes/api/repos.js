const express = require('express');
const { updateRecord } = require('./../../gitUtility/initialSeed');
const { Repository } = require('./../../db/repositories');
const { constants } = require('./../../../config/constants');

const router = express.Router();

// Middleware used to check if authenticated.
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('isAuthenticated: No');
    res.redirect('/user/login');
};

router.get('/v1/search', (req, res) => {
    const query = {};
    if (req.query.stargazer) {
        query.stargazersLogin = {
            $all: [req.query.stargazer],
        };
    }
    // Filter language depending on what selected.
    if (req.query.language && req.query.language !== constants.ANY) {
        if (req.query.language === constants.NOLANGUAGE) {
            query.language = null;
        } else {
            query.language = new RegExp(`^${req.query.language}$`, 'i');
        }
    }
    Repository.paginate(query, {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.per_page, 10) || 10,
    })
    .then((result) => {
        res.send(result.docs);
    })
    .catch(e => res.status(400).send('Invalid query'));
});

router.get('/v1/updateRecord', isAuthenticated, (req, res) => {
    updateRecords(req.user.accessToken);
    res.send('<p> Updating Database please check terminal for info....... </p>');
});

module.exports.reposRoutes = router;
