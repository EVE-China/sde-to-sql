import * as yaml from 'js-yaml';
import * as fs from 'fs';

import { getFieldsByYaml } from './utils';
import { generateDDLByFields } from './sqlite/index';

const typeIdsYamlPath = 'sde/fsd/typeIDs.yaml';
const marketGroupsYamlPath = 'sde/fsd/marketGroups.yaml';
const blueprintsYamlPath = 'sde/fsd/blueprints.yaml';

// let fields = getFieldsByYaml(typeIdsYamlPath);
// let sql = generateDDLByFields('type', 'id', fields);
// console.log(sql);

// fields = getFieldsByYaml(marketGroupsYamlPath);
// sql = generateDDLByFields('market_group', 'id', fields);
// console.log(sql);

// fields = getFieldsByYaml(blueprintsYamlPath);
// sql = generateDDLByFields('blueprint', 'id', fields);
// console.log(sql);
const doc = yaml.safeLoad(fs.readFileSync(blueprintsYamlPath, 'utf8'));
  Object.keys(doc).forEach(id => {
    const blueprint = doc[id];
    const activities = blueprint.activities
    if (null != activities) {
      console.log(activities.invention);
    }
  });