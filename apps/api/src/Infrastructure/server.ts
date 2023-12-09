import bodyParser, { urlencoded } from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import RouteRegistrator from './Route/RouteRegistrator';

export class Server {
    private express: express.Express;
    private port: string;
    private httpServer?: http.Server;

    constructor(port: string) {
        this.port = port;
        this.express = express();
        this.express.use(express.json({ limit: '35mb' }));
        this.express.use(cors());
        this.express.use(urlencoded({ extended: true }));
        this.express.use(helmet.xssFilter());
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: 'deny' }));
        this.express.use(compress());
        this.express.use(
            bodyParser.urlencoded({
                extended: true,
                limit: '35mb',
                parameterLimit: 50000,
            })
        );

        const router = Router();
        router.use(errorHandler());
        this.express.use(router);

        new RouteRegistrator().register(router);

        router.use(
            (
                err: Error,
                _req: Request,
                res: Response,
                //eslint-disable-next-line
                _next: NextFunction
            ): void => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
            }
        );
    }

    async listen(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = this.express.listen(this.port, () => {
                console.log(
                    `  '{.".} > api server started at http://localhost:${
                        this.port
                    } in ${this.express.get('env')} mode`
                );
                console.log('  Press CTRL-C to stop\n');
                resolve();
            });
        });
    }

    getHTTPServer() {
        return this.httpServer;
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            }

            return resolve();
        });
    }
}
