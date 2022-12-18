/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("kegiatan", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    name_task: {
      type: "TEXT",
      notNull: true,
    },
    day: {
      type: "TEXT",
      notNull: true,
    },
    time_start: {
      type: "TEXT",
      notNull: true,
    },
    time_end: {
      type: "TEXT",
      notNull: true,
    },
    peserta_id: {
      type: "TEXT",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("kegiatan");
};
