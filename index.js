const yaml = require('js-yaml');
const fs   = require('fs');

const typeIdsYamlPath = 'sde/fsd/typeIDs.yaml';
const blueprintsYamlPath = 'sde/fsd/blueprints.yaml';

try {
  const doc = yaml.safeLoad(fs.readFileSync(blueprintsYamlPath, 'utf8'));
  Object.keys(doc).forEach(blueprint => {
    let manufacturing = doc[blueprint].activities.manufacturing;
    if (null != manufacturing) {
      let products = manufacturing.products;
      if (null != products && products.length > 1) {
        console.log(products);
      }
    }
  });
} catch (e) {
  console.log(e);
}