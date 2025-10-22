module.exports = {
  name: "Aurin.mx - Páginas en inglés", 
  description: "Monitoreo de rendimiento para aurin.mx - Páginas en inglés",
  options: {
    frequency: 60 * 23, // 23 hours
    freshChrome: "run",
    runs: 3,
  },
  urls: [
    "https://aurin.mx/en/",
    "https://aurin.mx/en/about",
    "https://aurin.mx/en/services",
    "https://aurin.mx/en/projects", 
    "https://aurin.mx/en/contact",
  ],
};
