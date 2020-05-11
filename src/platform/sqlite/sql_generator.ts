import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AbstractSqlGenerator } from "../helper";
import { saveBluePrint } from './blueprint';
import { saveType } from './type';

export class SqliteGenerator extends AbstractSqlGenerator {

  protected initBluePrint(): string {
    return fs.readFileSync(`${__dirname}/blueprint_init.sql`).toString();
  }
  protected initBluePrintData(): string {
    const doc = yaml.safeLoad(fs.readFileSync(AbstractSqlGenerator.blueprintsYamlPath, 'utf8'));
    let sql = '';
    for (const id in doc) {
      const blueprint = doc[id];
      sql += saveBluePrint(Number.parseInt(id), blueprint);
    }
    return sql;
  }
  protected initType(): string {
    return fs.readFileSync(`${__dirname}/type_init.sql`).toString();
  }
  protected initTypeData(): string {
    const doc = yaml.safeLoad(fs.readFileSync(AbstractSqlGenerator.typeIdsYamlPath, 'utf8'));
    let sql = '';
    for (const id in doc) {
      const type = doc[id];
      sql += saveType(Number.parseInt(id), type);
    }
    return sql;
  }
}

/**
 * 将指定对象的值转换成可以在sql中执行的形式
 */
export function objToSql(obj: any): string {
  const type = typeof obj;
  switch(type) {
    case 'number':
      return `${obj}`;
    case 'boolean':
      return `${obj}`;
    case 'string':
      return `"${obj}"`;
    case 'undefined':
      return 'NULL';
    default:
      throw new Error(`尚未支持的类型:${type}`);
  }
}