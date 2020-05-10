import {ValidationInterface} from "../interfaces/ValidationInterface";
import {Request, Response} from "express";
import * as Joi from '@hapi/joi';
import JobStruct from "../../database/structs/JobStruct";

export default class CreateJobValidation implements ValidationInterface{

    validate(): (req: Request, res: Response, next: any) => void {
        return (req: Request, res: Response, next: any) => {
            const { error } = this.schema().validate(req.body);

            if (error) {
                return res.status(400).json(error.details).end();
            }

            req['job'] = new JobStruct(req);

            next();
        };
    }

    schema(): Joi.ObjectSchema {
        return Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            scheduled: Joi.string().required(),
            worker: {
                type: Joi.string().required(),
                id: Joi.string().required()
            },
            args: Joi.array().required(),
            inProgress: Joi.boolean().required(),
            queued: Joi.boolean().required()
        });
    }


}
