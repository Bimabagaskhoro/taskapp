const routes = (handler) => [
  {
    method: "POST",
    path: "/kegiatan",
    handler: (request, h) => handler.postKegiatanHandler(request, h),
    //handler: handler.postKegiatanHandler,
  },
  {
    method: "GET",
    path: "/kegiatan",
    handler: (request, h) => handler.getKegiatanHandler(request, h),
    //handler: handler.getKegiatanHandler,
  },
  {
    method: "GET",
    path: "/kegiatan/{id}",
    handler: (request, h) => handler.getKegiatanByIdHandler(request, h),
    //handler: handler.getKegiatanByIdHandler,
  },
  {
    method: "PUT",
    path: "/kegiatan/{id}",
    handler: (request, h) => handler.putKegiatanByIdHandler(request, h),
    //handler: handler.putKegiatanByIdHandler,
  },
  {
    method: "DELETE",
    path: "/kegiatan/{id}",
    handler: (request, h) => handler.deleteKegiatanByIdHandler(request, h),
    //handler: handler.deleteKegiatanByIdHandler,
  },
];

module.exports = routes;
