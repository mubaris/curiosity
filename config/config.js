if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}

const dotenv = require('dotenv').config({
    path: `${__dirname}/.${process.env.NODE_ENV}.env`,
});

console.log('NODE_ENV ->', process.env.NODE_ENV);
console.log('MONGODB_URI ->', process.env.MONGODB_URI);
