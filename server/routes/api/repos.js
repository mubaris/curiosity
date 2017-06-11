const express = require('express');
const { Repository } = require('./../../db/repositories');

const router = express.Router();

router.get('/search', (req, res) => {
    const query = {};
    if (req.query.stargazer) {
        query.stargazersLogin = { $all: [req.query.stargazer] };
    }
    if (req.query.language) {
        query.language = new RegExp(`^${req.query.language}$`, 'i');
    }
    Repository.paginate(query,
        { page: parseInt(req.query.page, 10) || 1,
            limit: parseInt(req.query.per_page, 10) || 10 })
        .then((result) => {
            res.send(result.docs);
        })
        .catch(e => res.status(400).send('Invalid query'));
});

module.exports.reposRoutes = router;
