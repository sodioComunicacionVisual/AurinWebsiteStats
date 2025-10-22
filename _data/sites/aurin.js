module.exports = {
  name: "Aurin.mx - Páginas principales",
  description: "Monitoreo de rendimiento para aurin.mx - Páginas principales",
  options: {
    frequency: 60 * 23, // 23 hours
    freshChrome: "run",
    runs: 3,
  },
  urls: [
    "https://aurin.mx/",
    "https://aurin.mx/nosotros",
    "https://aurin.mx/servicios", 
    "https://aurin.mx/proyectos",
    "https://aurin.mx/contacto",
  ],
};
