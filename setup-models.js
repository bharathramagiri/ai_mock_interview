const fs = require('fs');
const https = require('https');
const path = require('path');

// Create the public/models directory if it doesn't exist
const dir = path.join(__dirname, 'public', 'models');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log('Created /public/models directory');
}

// The official face-api.js weights
const baseUrl = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights/';
const files = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1'
];

console.log('Downloading AI models... This might take a few seconds.');

// Download each file
files.forEach(file => {
  const dest = path.join(dir, file);
  https.get(baseUrl + file, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(dest);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Successfully downloaded: ${file}`);
      });
    } else {
      console.error(`❌ Failed to download ${file}. Status Code: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`❌ Error downloading ${file}: ${err.message}`);
  });
});