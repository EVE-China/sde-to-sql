import { getFieldsByYaml } from './utils';
import { generateDDLByFields } from './sqlite/index';

const typeIdsYamlPath = 'sde/fsd/typeIDs.yaml';
const marketGroupsYamlPath = 'sde/fsd/marketGroups.yaml';
const blueprintsYamlPath = 'sde/fsd/blueprints.yaml';

let fields = getFieldsByYaml(typeIdsYamlPath);
let sql = generateDDLByFields('type', 'id', fields);
console.log(sql);

fields = getFieldsByYaml(marketGroupsYamlPath);
sql = generateDDLByFields('market_group', 'id', fields);
console.log(sql);