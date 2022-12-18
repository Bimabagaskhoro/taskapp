require("dotenv").config();

const Hapi = require("@hapi/hapi");
const ClientError = require("./exceptions/ClientError");

const kegiatan = require("./api/kegiatan");
const KegiatanServices = require("./services/postgres/KegiatanServices");
const KegiatanValidator = require("./validator/kegiatan");

const peserta = require("./api/peserta");
const PesertaServices = require("./services/postgres/PesertaServices");
const PesertaValidator = require("./validator/peserta");

const init = async () => {
  const kegiatanService = new KegiatanServices();
  const pesertaService = new PesertaServices();

  const server = Hapi.server({
    // port: 5000,
    // host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: kegiatan,
      options: {
        service: kegiatanService,
        validator: KegiatanValidator,
      },
    },
    {
      plugin: peserta,
      options: {
        service: pesertaService,
        validator: PesertaValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      if (!response.isServer) {
        return h.continue;
      }
      console.error(response);
      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
