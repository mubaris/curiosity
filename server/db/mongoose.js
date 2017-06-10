const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (err) throw err;
});

module.exports = mongoose;
