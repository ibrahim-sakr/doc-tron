import {ValidationInterface} from "../interfaces/ValidationInterface";
import {Request, Response} from "express";
import * as Joi from '@hapi/joi';

export default class FindJobValidation implements ValidationInterface{

    validate(): (req: Request, res: Response, next: any) => void {
        return (req: Request, res: Response, next: any) => {
            const { error } = this.schema().validate(req.params);

            if (error) {
                return res.status(400).json(error.details).end();
            }

            req['jobId'] = req.params.jobId;

            next();
        };
    }

    schema(): Joi.ObjectSchema {
        return Joi.object({
            jobId: Joi.string().required(),
        });
    }


}
