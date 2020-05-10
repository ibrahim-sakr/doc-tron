import {Request, Response} from "express";
import { ObjectSchema } from '@hapi/joi';

export interface ValidationInterface {
    validate(): (req: Request, res: Response, next: any) => void

    schema(): ObjectSchema
}