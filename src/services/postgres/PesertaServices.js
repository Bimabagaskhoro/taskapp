const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapJoin, mapDBToModelPeserta } = require("../../utils/index");

class PesertaServices {
  constructor() {
    this._pool = new Pool();
  }

  // done
  async addPeserta({ name }) {
    await this.verifyNewName(name);

    const id = `peserta-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO peserta VALUES($1, $2) RETURNING id",
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("Peserta gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  // done
  async getPeserta() {
    const result = await this._pool.query("SELECT id, name FROM peserta");
    return result.rows;
  }

  //belum
  async getPesertaById(id) {
    const query = {
      text: `SELECT peserta.*, kegiatan.id as kegiatan_id, kegiatan.name_task as kegiatan_name, kegiatan.day as kegiatan_day, kegiatan.time_start as time_start, kegiatan.time_end as time_end FROM peserta
      LEFT JOIN kegiatan ON kegiatan.peserta_id = peserta.id WHERE peserta.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Data Peserta tidak ditemukan");
    }

    const kegiatan = result.rows.map(mapJoin);
    const peserta = result.rows.map(mapDBToModelPeserta)[0];
    return { peserta, kegiatan };
  }

  // done
  async editPesertaById(id, { name }) {
    await this.verifyNewName(name);
    const query = {
      text: "UPDATE peserta SET name = $1 WHERE id = $2 RETURNING id",
      values: [name, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui Peserta. id tidak ditemukan.");
    }
  }

  // done
  async deletePesertaById(id) {
    const query = {
      text: "DELETE FROM peserta WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Peserta gagal dihapus. Id tidak ditemukan.");
    }
  }

  // verify name done
  async verifyNewName(name) {
    const query = {
      text: "SELECT name FROM peserta WHERE name = $1",
      values: [name],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        "Gagal menambahkan peserta. Nama sudah digunakan"
      );
    }
  }
}

module.exports = PesertaServices;
