require('./../config/config');

const express = require('express');
const { mongoose } = require('./db/mongoose');
const { usernameRoutes } = require('./routes/api/username');
const { userRoutes } = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../public`));

app.use('/user',userRoutes);
app.use('/api/username', usernameRoutes);

app.listen(port, () => {
    console.log(`Starting server on port ${port}.`);
});

module.exports.app = app;

