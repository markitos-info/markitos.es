import { Request, Response } from 'express';

export interface ApiAction {
    execute(req: Request, res: Response): void;
}
