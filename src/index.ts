import { getFieldsByYaml } from './utils';
import { generateDDLByFields } from './sqlite/index';

const typeIdsYamlPath = 'sde/fsd/typeIDs.yaml';
const blueprintsYamlPath = 'sde/fsd/blueprints.yaml';

const fields = getFieldsByYaml(typeIdsYamlPath);
const sql = generateDDLByFields('type', 'id', fields);
console.log(sql);