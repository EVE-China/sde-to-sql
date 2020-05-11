import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {
  getBluePrintInitSql as getBluePrintInitSqlBySqlite,
  saveBluePrint as saveBluePrintBySqlite,
  saveType as saveTypeBySqlite
} from './platform/sqlite/index';

/**
 * 检测指定的yaml有哪些字段以及对应的类型
 * 
 * @param {string} path yaml路径
 */
export function getFieldsByYaml(path: string): { [key: string]: string } {
  const fields: { [key: string]: string } = { };
  const doc = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
  Object.keys(doc).forEach(typeID => {
    const type = doc[typeID];
    Object.keys(type).forEach(field => {
      const t = type[field];
      if (null == fields[field] && null != t) {
        fields[field] = typeof t;
      }
    });
  });
  return fields;
}
/**
 * 将蓝图存入到对应的数据库中
 * @param db        数据库名称
 * @param typeId    蓝图编号
 * @param bluePrint 蓝图对象
 */
export function saveBluePrint(db: string, typeId: string, bluePrint: any): string {

  switch(db) {
    case 'sqlite':
      return saveBluePrintBySqlite(typeId, bluePrint);
    default:
      throw new Error('尚为支持的数据库');
  }

}

/**
 * 将type存入到对应的数据库中
 * @param db     数据库名称
 * @param typeId 编号
 * @param type   对象
 */
export function saveType(db: string, typeId: string, type: any): string {

  switch(db) {
    case 'sqlite':
      return saveTypeBySqlite(typeId, type);
    default:
      throw new Error('尚为支持的数据库');
  }

}