const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
try {
  const doc = yaml.safeLoad(fs.readFileSync('sde/fsd/typeIDs.yaml', 'utf8'));
  console.log(Object.keys(doc).length);
} catch (e) {
  console.log(e);
}