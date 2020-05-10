import { Request, Response } from 'express'

export default (req: Request, resp: Response, next) => {
    console.log('incoming request:', req.method, req.path);
    next();
}

