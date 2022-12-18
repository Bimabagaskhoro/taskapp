const PesertaHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "peserta",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const pesertaHandler = new PesertaHandler(service, validator);
    server.route(routes(pesertaHandler));
  },
};
