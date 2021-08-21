import chalk from 'chalk';
import express, { Request, Response, NextFunction } from 'express';
import figlet from 'figlet';
import config from "./config/db.configuration";
import Logger from './utility/logger.winston';
import cors from "cors";
import DBController from "./db/db.controller";
import fs from "fs";
import DBException from './db/db.exception';
var install = require.resolve('../install.bat');
var child_process = require('child_process');

class App {
    private app: express.Application;
    private port: number;
    private appTitle: string = config.SERVER.TITLE;
    private prefix = config.API.PREFIX;

    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.init();
    }

    private print(): void {
        return console.log(chalk.green(figlet.textSync(this.appTitle, { horizontalLayout: "full" })));
    }

    private check() {
        try {
            if (fs.existsSync("./node_modules")) {
                console.log("Prerequisite check passed.");
            } else {
                console.log("Something is missing");
                this.installMissing();
            }
        } catch (e) {
            console.log("An error occurred.")
        }
    }

    private installMissing() {
        child_process.exec(install, function (error: any, stdout: any, stderr: any) {
            if (error) {
                console.log(error);
            } else if (stdout) {
                console.log(stdout);
            } else {
                console.log(stderr)
            }
        });
    }

    private init() {
        this.check();
        this.app.enable("trust proxy");
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(`${this.prefix}`, new DBController().router);
        this.app.use((error: DBException, request: Request, response: Response, next: NextFunction) => {
            const status = error.status || 500;
            const message = error.message || "☹ Something went wrong !!!";
            Logger.debug({ status, message });
            response.status(status).send({ status, message });
        });
    }

    public async listen() {
        await this.print();
        return this.app.listen(this.port, () => {
            Logger.debug(`## 🚀 🛡️  ${this.appTitle} listening on port: ${this.port} 🛡️ 🚀  ##`);
            Logger.debug("Press Ctrl + C to quit.");
        });
    }

}

export default App;