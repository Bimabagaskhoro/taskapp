const mapDBToModelPeserta = ({ id, name }) => ({
  id,
  name,
});

const mapDBToModelKegiatan = ({
  id,
  name_task,
  day,
  time_start,
  time_end,
  pesertaId,
}) => ({
  id,
  name_task,
  day,
  time_start,
  time_end,
  pesertaId,
});

const mapJoin = ({
  kegiatan_id,
  kegiatan_name,
  kegiatan_day,
  time_start,
  time_end,
}) => ({
  id: kegiatan_id,
  name: kegiatan_name,
  day: kegiatan_day,
  time_start: time_start,
  time_end: time_end,
});

module.exports = { mapDBToModelKegiatan, mapJoin, mapDBToModelPeserta };
