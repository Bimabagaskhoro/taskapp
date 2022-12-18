const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapDBToModelKegiatan } = require("../../utils/index");

class KegiatanServices {
  constructor() {
    this._pool = new Pool();
  }

  // done
  async addKegiatan({ name_task, day, time_start, time_end, pesertaId }) {
    const id = `kegiatan-${nanoid(16)}`;
    const query = {
      text: "INSERT INTO kegiatan VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, name_task, day, time_start, time_end, pesertaId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Kegiatan gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  // done
  async getKegiatan() {
    const result = await this._pool.query(
      "SELECT name_task, day, time_start, time_end, peserta_id FROM kegiatan"
    );
    return result.rows;
  }

  // done
  async getKegiatanById(id) {
    const query = {
      text: "SELECT * FROM kegiatan WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Kegiatan tidak ditemukan");
    }

    return result.rows.map(mapDBToModelKegiatan)[0];
  }

  // done
  async editKegiatanaById(
    id,
    { name_task, day, time_start, time_end, pesertaId }
  ) {
    const query = {
      text: `UPDATE kegiatan 
      SET
      name_task = $1,
      day = $2,
      time_start = $3,
      time_end = $4,
      peserta_id = $5
      WHERE id = $6
      RETURNING id`,
      values: [name_task, day, time_start, time_end, pesertaId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(
        "Gagal memperbarui Kegiatan. Id tidak ditemukan."
      );
    }
  }

  // done
  async deletePesertaById(id) {
    const query = {
      text: "DELETE FROM kegiatan WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Kegiatan gagal dihapus. Id tidak ditemukan.");
    }
  }
}

module.exports = KegiatanServices;
