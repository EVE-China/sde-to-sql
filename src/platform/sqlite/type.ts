import * as fs from 'fs';

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
export function saveType(typeId: string, type: any): string {
  if (null == type) {
    return '';
  }
  let sql = 'REPLACE INTO "type"("id", "groupID", "mass", "portionSize", "published", "volume", "radius", "graphicID", "soundID", "iconID", "raceID", "sofFactionName", "basePrice", "marketGroupID", "capacity", "metaGroupID", "variationParentTypeID", "factionID", "sofMaterialSetID") VALUES(' + 
    `${typeId}, ${type.groupID}, ${type.mass}, ${type.portionSize}, ${type.published}, ${type.volume}, ${type.radius}, ${type.graphicID}, ${type.soundID}, ${type.iconID}, ${type.raceID}, ${type.sofFactionName}, ${type.basePrice}, ${type.marketGroupID}, ${type.capacity}, ${type.metaGroupID}, ${type.variationParentTypeID}, ${type.factionID}, ${type.sofMaterialSetID}`
   + ');';
  // TODO 名称多语言部分
  // TODO 描述多语言部分
  // TODO type_masteries
  // TODO type_traits
  return sql;
}
