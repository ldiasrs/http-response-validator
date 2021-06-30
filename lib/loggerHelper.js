const winston = require('winston');
createLogger = (keyName) => {
    const logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: `./reports/${keyName}/${new Date().toUTCString()}.log` }),
        ]
    });
    return logger;
}

module.exports = {createLogger}