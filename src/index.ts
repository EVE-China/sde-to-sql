import * as yaml from 'js-yaml';
import * as fs from 'fs';

import { getFieldsByYaml, saveBluePrint } from './utils';

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

// process.argv[2]
const db = 'sqlite';

let sql = '';
for (const id in doc) {
  const blueprint = doc[id];
  if (sql.length != 0) {
    sql += '\n';
  }
  sql += saveBluePrint(db, id, blueprint);
}
fs.writeFileSync('./dist/blueprint.sql', sql);