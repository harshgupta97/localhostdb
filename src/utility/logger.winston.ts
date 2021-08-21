import winston from "winston";
import config from "../config/db.configuration";

const transports = [];

const options = {
    infoFile: {
        level: "debug",
        filename: "combined.log",
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxfile: 5,
        colorize: false,
    },
    errorFile: {
        level: "error",
        filename: "error.log",
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxfile: 5,
        colorize: false,
    },
    console: {
        level: "debug",
        levels: config.LOGS.LEVEL,
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true,
        format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
        )
    },
};

if (process.env.NODE_ENV !== "development") {
    transports.push(
        new winston.transports.Console(options.console),
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.errorFile),
    )
} else {
    // Log the info into the database
    // transports.push(
    //     new winston.transports.Console(options.console),
    //     new winston.transports.File(options.infoFile),
    //     new winston.transports.File(options.errorFile),
    // )
}

const Logger = winston.createLogger({
    level: config.LOGS.LEVEL,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports
});

export default Logger;