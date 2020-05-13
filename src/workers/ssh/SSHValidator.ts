import * as Joi from "@hapi/joi";

const SSHValidator: { [key: string]: Joi.AnySchema } = {
    type: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    privateKey: Joi.string().required(),
    command: Joi.string().required(),
    passphrase: Joi.string().required(),
}

export default SSHValidator
