const fs = require('fs');
const path = require('path');

module.exports = function() {
  const resultsDir = path.join(__dirname, 'results');
  const lighthouseData = {};
  
  if (!fs.existsSync(resultsDir)) {
    console.log('Results directory not found');
    return {};
  }
  
  try {
    // Leer todos los directorios de resultados (hashes)
    const hashDirs = fs.readdirSync(resultsDir).filter(item => {
      const itemPath = path.join(resultsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
    
    console.log(`Found ${hashDirs.length} hash directories`);
    
    hashDirs.forEach(hash => {
      const hashDir = path.join(resultsDir, hash);
      
      try {
        const files = fs.readdirSync(hashDir).filter(file => file.endsWith('.json'));
        
        if (files.length > 0) {
          // Tomar el archivo más reciente
          const latestFile = files.sort().pop();
          const filePath = path.join(hashDir, latestFile);
          
          try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            // Validar que tenemos los datos necesarios
            if (!data.lighthouse || !data.url) {
              console.log(`Skipping ${filePath}: missing lighthouse or url data`);
              return;
            }
            
            const lighthouse = data.lighthouse;
            const key = data.requestedUrl || data.url;
            
            lighthouseData[key] = {
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
            
            console.log(`Processed data for ${key}: Performance ${lighthouse.performance * 100}%`);
            
          } catch (parseErr) {
            console.error(`Error parsing ${filePath}:`, parseErr.message);
          }
        }
      } catch (dirErr) {
        console.error(`Error reading directory ${hashDir}:`, dirErr.message);
      }
    });
    
    console.log(`Total URLs processed: ${Object.keys(lighthouseData).length}`);
    return lighthouseData;
    
  } catch (err) {
    console.error('Error in lighthouse-api.js:', err.message);
    return {};
  }
};
