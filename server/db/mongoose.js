let mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/curiosity';

console.log(`MONGODB_URI = ${uri}`);
mongoose.Promise = global.Promise;

mongoose.connect(uri, (err) => {
    if (err) throw err;
});

module.exports = mongoose;
