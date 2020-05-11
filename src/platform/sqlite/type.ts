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
  // TODO 名称多语言部分
  // TODO 描述多语言部分
  // TODO type_masteries
  // TODO type_traits
  sql += '\n';
  return sql;
}
