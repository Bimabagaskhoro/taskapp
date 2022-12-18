const Joi = require("joi");

const PesertaPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { PesertaPayloadSchema };
