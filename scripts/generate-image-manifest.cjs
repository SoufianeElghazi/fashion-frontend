const fs = require('fs');
const path = require('path');

// Chemin vers le dossier models dans public
const modelsDir = path.join(__dirname, '../public/models');

// Liste de vos catégories
const categories = ['Blouses', 'Dresses', 'Hijabis', 'Kids', 'Pyjamas', 'VestesGilet'];

const manifest = {};

categories.forEach(category => {
  const categoryPath = path.join(modelsDir, category);
  
  if (fs.existsSync(categoryPath)) {
    // Lire tous les fichiers .png et les trier par numéro
    const files = fs.readdirSync(categoryPath)
      .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
    
    // Créer les chemins complets
    manifest[category] = files.map(file => `/models/${category}/${file}`);
    
    console.log(`✅ ${category}: ${files.length} images trouvées`);
  } else {
    manifest[category] = [];
    console.log(`⚠️  ${category}: dossier non trouvé`);
  }
});

// Sauvegarder le manifeste dans public/
const outputPath = path.join(__dirname, '../public/models-manifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log('\n📦 Manifeste généré:', outputPath);
console.log('Total images:', Object.values(manifest).flat().length);
