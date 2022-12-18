const InvariantError = require("../../exceptions/InvariantError");

const { KegiatanPayloadSchema } = require("./schema");

const KegiatanValidator = {
  validateKegiatanPayload: (payload) => {
    const validationResult = KegiatanPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = KegiatanValidator;
