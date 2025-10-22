module.exports = {
  name: "Aurin.mx - Páginas de contenido y legales",
  description: "Monitoreo de rendimiento para aurin.mx - Páginas de contenido y legales",
  options: {
    frequency: 60 * 23, // 23 hours
    freshChrome: "run",
    runs: 3,
  },
  urls: [
    "https://aurin.mx/privacidad",
    "https://aurin.mx/terminosycondiciones",
    "https://aurin.mx/proyectos-payload",
    "https://aurin.mx/proyecto-prueba",
  ],
};
