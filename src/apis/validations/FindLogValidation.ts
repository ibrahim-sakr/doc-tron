import {ValidationInterface} from "../interfaces/ValidationInterface";
import {Request, Response} from "express";
import * as Joi from '@hapi/joi';

export default class FindLogValidation implements ValidationInterface{

    validate(): (req: Request, res: Response, next: any) => void {
        return (req: Request, res: Response, next: any) => {
            const { error } = this.schema().validate(req.params);

            if (error) {
                return res.status(422).json(error.details).end();
            }

            req['logId'] = req.params.logId;

            next();
        };
    }

    schema(): Joi.ObjectSchema {
        return Joi.object({
            logId: Joi.string().required(),
        });
    }


}
