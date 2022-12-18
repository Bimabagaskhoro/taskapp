const InvariantError = require("../../exceptions/InvariantError");

const { PesertaPayloadSchema } = require("./schema");

const PesertaValidator = {
  validatePesertaPayload: (payload) => {
    const validationResult = PesertaPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PesertaValidator;
