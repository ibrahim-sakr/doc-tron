import * as Joi from "@hapi/joi";

const HttpValidator: { [key: string]: Joi.AnySchema } = {
    type: Joi.string().required(),
    url: Joi.string().required()
}

export default HttpValidator
