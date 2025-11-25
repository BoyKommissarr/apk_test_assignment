const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// ensure logs folder exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logger = createLogger({
    level: 'info',

    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
    ),

    transports: [
        new transports.File({
            filename: path.join(logsDir, 'execution.log'),
            maxsize: 5_000_000,
            maxFiles: 3
        }),

        // still see logs on console during debug
        new transports.Console(),
    ]
});

module.exports = logger;
