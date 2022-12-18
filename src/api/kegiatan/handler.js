class KegiatanHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postKegiatanHandler = this.postKegiatanHandler.bind(this);
    this.getKegiatanHandler = this.getKegiatanHandler.bind(this);
    this.getKegiatanByIdHandler = this.getKegiatanByIdHandler.bind(this);
    this.putKegiatanByIdHandler = this.putKegiatanByIdHandler.bind(this);
    this.deleteKegiatanByIdHandler = this.deleteKegiatanByIdHandler.bind(this);
  }

  //done
  async postKegiatanHandler(request, h) {
    this._validator.validateKegiatanPayload(request.payload);
    const { name_task, day, time_start, time_end, pesertaId } = request.payload;

    const kegiatanId = await this._service.addKegiatan({
      name_task,
      day,
      time_start,
      time_end,
      pesertaId,
    });

    const response = h.response({
      status: "success",
      data: {
        kegiatanId,
      },
    });
    response.code(201);
    return response;
  }

  //done
  async getKegiatanHandler() {
    const kegiatan = await this._service.getKegiatan();
    return {
      status: "success",
      data: {
        kegiatan,
      },
    };
  }

  //done
  async getKegiatanByIdHandler(request, h) {
    const { id } = request.params;
    const kegiatan = await this._service.getKegiatanById(id);

    return {
      status: "success",
      data: {
        kegiatan,
      },
    };
  }

  //done
  async putKegiatanByIdHandler(request, h) {
    this._validator.validateKegiatanPayload(request.payload);
    const { id } = request.params;
    const { name_task, day, time_start, time_end, pesertaId } = request.payload;

    await this._service.editKegiatanaById(id, {
      name_task,
      day,
      time_start,
      time_end,
      pesertaId,
    });

    return {
      status: "success",
      message: "Kegiatan berhasil diperbarui",
    };
  }

  //done
  async deleteKegiatanByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deletePesertaById(id);

    return {
      status: "success",
      message: "Kegiatan berhasil dihapus",
    };
  }
}

module.exports = KegiatanHandler;
