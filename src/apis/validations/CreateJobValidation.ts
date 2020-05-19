import {ValidationInterface} from "../interfaces/ValidationInterface";
import {Request, Response} from "express";
import * as Joi from '@hapi/joi';
import workersConfig from '../../config/workers';

export default class CreateJobValidation implements ValidationInterface{

    validate(): (req: Request, res: Response, next: any) => void {
        return (req: Request, res: Response, next: any) => {
            console.log('=============');
            console.log(req.body);
            console.log('=============');
            const { error, value } = this.schema(req.body.worker?.type).validate(req.body);

            if (error) {
                return res.status(422).json(error.details).end();
            }

            req['job'] = value;

            next();
        };
    }

    schema(type: string): Joi.ObjectSchema {
        return Joi.object({
            id: Joi.number(),
            name: Joi.string().required(),
            queued: Joi.boolean().required(),
            scheduled: Joi.string().required(),
            description: Joi.string(),
            in_progress: Joi.boolean(),
            created_at: Joi.date(),
            deleted_at: Joi.date().allow(null),
            updated_at: Joi.date(),
            next_run: Joi.date(),
            worker: workersConfig.validators[type || 'http'],
        });
    }


}

