const Joi = require("joi");

const KegiatanPayloadSchema = Joi.object({
  name_task: Joi.string().required(),
  day: Joi.string().required(),
  time_start: Joi.string().required(),
  time_end: Joi.string().required(),
  pesertaId: Joi.string(),
});

module.exports = { KegiatanPayloadSchema };
