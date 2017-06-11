const winston = require('winston');

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
    transports: [
    // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'filelog-debug.log',
            level: 'debug',
        }),
    ],
});

logger.level = 'info';

// logger.debug('Test Log Message', { anything: 'This is metadata' });

module.exports.logger = logger;