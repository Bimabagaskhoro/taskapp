const ClientError = require("../../exceptions/ClientError");

class PesertaHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPesertaHandler = this.postPesertaHandler.bind(this);
    this.getPesertaHandler = this.getPesertaHandler.bind(this);
    this.getPesertaByIdHandler = this.getPesertaByIdHandler.bind(this);
    this.putPesertaByIdHandler = this.putPesertaByIdHandler.bind(this);
    this.deletePesertaByIdHandler = this.deletePesertaByIdHandler.bind(this);
  }

  // done
  async postPesertaHandler(request, h) {
    this._validator.validatePesertaPayload(request.payload);
    const { name } = request.payload;
    const pesertaId = await this._service.addPeserta({
      name,
    });
    const response = h.response({
      status: "success",
      message: "Peserta berhasil ditambahkan",
      data: {
        pesertaId,
        name,
      },
    });
    response.code(201);
    return response;
  }

  // done
  async getPesertaHandler() {
    const data = await this._service.getPeserta();
    return {
      status: "success",
      data,
    };
  }

  // belum
  async getPesertaByIdHandler(request, h) {
    const { id } = request.params;
    const data = await this._service.getPesertaById(id);
    //peserta.kegiatan = await this._service.getKegiatanByPesertaId(id);

    const response = h.response({
      status: "success",
      data,
    });

    return response;
  }

  // done
  async putPesertaByIdHandler(request, h) {
    this._validator.validatePesertaPayload(request.payload);

    const { id } = request.params;
    const { name } = request.payload;

    await this._service.editPesertaById(id, { name });
    return {
      status: "success",
      message: "Peserta berhasil diperbarui",
    };
  }

  // done
  async deletePesertaByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deletePesertaById(id);

    return {
      status: "success",
      message: "Peserta berhasil dihapus",
    };
  }
}

module.exports = PesertaHandler;
