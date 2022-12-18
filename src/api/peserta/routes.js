const routes = (handler) => [
  {
    method: "POST",
    path: "/peserta",
    handler: (request, h) => handler.postPesertaHandler(request, h),
    //handler: handler.postPesertaHandler,
  },
  {
    method: "GET",
    path: "/peserta",
    handler: (request, h) => handler.getPesertaHandler(request, h),
    //handler: handler.getPesertaHandler,
  },
  {
    method: "GET",
    path: "/peserta/{id}",
    handler: (request, h) => handler.getPesertaByIdHandler(request, h),
    //handler: handler.getPesertaByIdHandler,
  },
  {
    method: "PUT",
    path: "/peserta/{id}",
    handler: (request, h) => handler.putPesertaByIdHandler(request, h),
    //handler: handler.putPesertaByIdHandler,
  },
  {
    method: "DELETE",
    path: "/peserta/{id}",
    handler: (request, h) => handler.deletePesertaByIdHandler(request, h),
    //handler: handler.deletePesertaByIdHandler,
  },
];

module.exports = routes;
