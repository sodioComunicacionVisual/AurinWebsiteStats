const fs = require('fs');
const path = require('path');

module.exports = function() {
  const resultsDir = path.join(__dirname, 'results');
  const lighthouseData = {};
  
  if (!fs.existsSync(resultsDir)) {
    return {};
  }
  
  // Leer todos los directorios de resultados (hashes)
  const hashDirs = fs.readdirSync(resultsDir).filter(item => {
    return fs.statSync(path.join(resultsDir, item)).isDirectory();
  });
  
  hashDirs.forEach(hash => {
    const hashDir = path.join(resultsDir, hash);
    const files = fs.readdirSync(hashDir).filter(file => file.endsWith('.json'));
    
    if (files.length > 0) {
      // Tomar el archivo más reciente
      const latestFile = files.sort().pop();
      const filePath = path.join(hashDir, latestFile);
      
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Convertir scores decimales a porcentajes
        const lighthouse = data.lighthouse || {};
        
        lighthouseData[data.requestedUrl || data.url] = {
          url: data.url,
          requestedUrl: data.requestedUrl,
          timestamp: data.timestamp,
          lighthouse: {
            performance: Math.round((lighthouse.performance || 0) * 100),
            accessibility: Math.round((lighthouse.accessibility || 0) * 100),
            bestPractices: Math.round((lighthouse.bestPractices || 0) * 100),
            seo: Math.round((lighthouse.seo || 0) * 100)
          },
          metrics: {
            firstContentfulPaint: data.firstContentfulPaint,
            speedIndex: data.speedIndex,
            largestContentfulPaint: data.largestContentfulPaint,
            totalBlockingTime: data.totalBlockingTime,
            cumulativeLayoutShift: data.cumulativeLayoutShift,
            timeToInteractive: data.timeToInteractive
          },
          weight: data.weight,
          axe: data.axe
        };
      } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
      }
    }
  });
  
  return lighthouseData;
};
