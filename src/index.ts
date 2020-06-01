import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { SqlGeneratorFactory } from './platform/sql_generator';

// let fields = getFieldsByYaml(typeIdsYamlPath);
// let sql = generateDDLByFields('type', 'id', fields);
// console.log(sql);

// fields = getFieldsByYaml(marketGroupsYamlPath);
// sql = generateDDLByFields('market_group', 'id', fields);
// console.log(sql);

// fields = getFieldsByYaml(blueprintsYamlPath);
// sql = generateDDLByFields('blueprint', 'id', fields);
// console.log(sql);

// process.argv[2]
const db = 'sqlite';

const sqlGenerator = SqlGeneratorFactory.getGenerator(db);

let sql = sqlGenerator.init();
sql += '\n' + sqlGenerator.data();
fs.writeFileSync(`./dist/eve.${db}.sql`, sql);
