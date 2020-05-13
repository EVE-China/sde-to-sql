import * as fs from 'fs';
import { objToSql } from './sql_generator';

/**
 * 返回蓝图需要的建表语句
 */
export function getTypeInitSql(): string {
  return fs.readFileSync(`${__dirname}/type_init.sql`).toString();
}

/**
 * 将type存入到sqlite中
 * @param typeId 编号
 * @param type   对象
 */
export function saveType(typeId: number, type: any): string {
  if (null == type) {
    return '';
  }
  let sql = 'REPLACE INTO "type"("id", "groupID", "mass", "portionSize", "published", "volume", "radius", "graphicID", "soundID", "iconID", "raceID", "sofFactionName", "basePrice", "marketGroupID", "capacity", "metaGroupID", "variationParentTypeID", "factionID", "sofMaterialSetID") VALUES(' + 
    `${objToSql(typeId)}, ${objToSql(type.groupID)}, ${objToSql(type.mass)}, ${objToSql(type.portionSize)}, ${objToSql(type.published)}, ${objToSql(type.volume)}, ${objToSql(type.radius)}, ${objToSql(type.graphicID)}, ${objToSql(type.soundID)}, ${objToSql(type.iconID)}, ${objToSql(type.raceID)}, ${objToSql(type.sofFactionName)}, ${objToSql(type.basePrice)}, ${objToSql(type.marketGroupID)}, ${objToSql(type.capacity)}, ${objToSql(type.metaGroupID)}, ${objToSql(type.variationParentTypeID)}, ${objToSql(type.factionID)}, ${objToSql(type.sofMaterialSetID)}`
   + ');';
  // 名称多语言部分
  sql += '\n' + saveTypeI18n(typeId, 'name', type.name);
  // 描述多语言部分
  sql += '\n' + saveTypeI18n(typeId, 'description', type.description);
  // TODO type_masteries
  // TODO type_traits
  sql += '\n';
  return sql;
}

/**
 * 保存type多语言
 * @param typeId 编号
 * @param key    key
 * @param arrays 多语言集合
 */
function saveTypeI18n(typeId: number, key: string, arrays: any): string {
  if (null == arrays) {
    return '';
  }
  let sql = '';
  for (const language in arrays) {
    const name = arrays[language];
    if (sql.length != 0) {
      sql += '\n';
    }
    sql += `REPLACE INTO "type_i18n"("typeId", "key", "language", "value") VALUES(${objToSql(typeId)}, ${objToSql(key)}, ${objToSql(language)}, ${objToSql(name)})`;
  }
  return sql;
}