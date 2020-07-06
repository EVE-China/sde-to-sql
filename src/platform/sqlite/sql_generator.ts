import * as fs from 'fs';
import { AbstractSqlGenerator } from "../helper";
import { ActivityType } from '../../enum';

export class SqliteGenerator extends AbstractSqlGenerator {

  protected initType(): string {
    return fs.readFileSync(`${__dirname}/type_init.sql`).toString();
  }

  protected initBluePrint(): string {
    return fs.readFileSync(`${__dirname}/blueprint_init.sql`).toString();
  }

  protected getTypeSQL(typeId: number, type: any): string {
    return 'REPLACE INTO "type"("id", "groupID", "mass", "portionSize", "published", "volume", "radius", "graphicID", "soundID", "iconID", "raceID", "sofFactionName", "basePrice", "marketGroupID", "capacity", "metaGroupID", "variationParentTypeID", "factionID", "sofMaterialSetID") VALUES(' + 
      `${objToSql(typeId)}, ${objToSql(type.groupID)}, ${objToSql(type.mass)}, ${objToSql(type.portionSize)}, ${objToSql(type.published)}, ${objToSql(type.volume)}, ${objToSql(type.radius)}, ${objToSql(type.graphicID)}, ${objToSql(type.soundID)}, ${objToSql(type.iconID)}, ${objToSql(type.raceID)}, ${objToSql(type.sofFactionName)}, ${objToSql(type.basePrice)}, ${objToSql(type.marketGroupID)}, ${objToSql(type.capacity)}, ${objToSql(type.metaGroupID)}, ${objToSql(type.variationParentTypeID)}, ${objToSql(type.factionID)}, ${objToSql(type.sofMaterialSetID)}`
      + ');';
  }

  protected getTypeI18n(typeId: number, key: string, language: string, value: string): string {
    return `REPLACE INTO "type_i18n"("typeId", "key", "language", "value") VALUES(${objToSql(typeId)}, ${objToSql(key)}, ${objToSql(language)}, ${objToSql(value)});`;
  }

  protected getBluePrintSQL(typeId: number, maxProductionLimit: number): string {
    return `REPLACE INTO "blueprint"("id", "maxProductionLimit") VALUES(${typeId}, ${maxProductionLimit});`;
  }

  protected getBluePrintActivitySQL(typeId: number, type: ActivityType, time: number): string {
    return `REPLACE INTO "blueprint_activity"("id", "type", "time") VALUES(${typeId}, ${type}, ${time});`;
  }

  protected getBluePrintMaterialSQL(typeId: number, type: ActivityType, materialId: number, quantity: number): string {
    return `REPLACE INTO "blueprint_material"("id", "activityType", "typeID", "quantity") VALUES(${typeId}, ${type}, ${materialId}, ${quantity});`;
  }

  protected getBluePrintSkillSQL(typeId: number, type: ActivityType, skillId: number, level: number): string {
    return `REPLACE INTO "blueprint_skill"("id", "activityType", "typeID", "level") VALUES(${typeId}, ${type}, ${skillId}, ${level});`;
  }

  protected getBluePrintProductSQL(typeId: number, type: import("../../enum").ActivityType, probability: number, productId: number, quantity: number): string {
    return `REPLACE INTO "blueprint_product"("id", "activityType", "probability", "typeID", "quantity") VALUES(${typeId}, ${type}, ${probability}, ${productId}, ${quantity});`;
  }
  
  protected initTypeMaterials(): string {
    throw new Error("Method not implemented.");
  }
  protected getTypeMaterial(typeId: number, materialTypeID: number, quantity: number): string {
    throw new Error("Method not implemented.");
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
      return `"${escape(obj)}"`;
    case 'undefined':
      return 'NULL';
    default:
      throw new Error(`尚未支持的类型:${type}`);
  }
}

/**
 * 转义
 * @param obj 字符串
 */
function escape(obj: string): string {
  let value = '';
  for(let i = 0; i < obj.length; i++) {
    let ch = obj.charAt(i);
    if ('"' === ch) {
      value += '"';
    }
    value += ch;
  }
  return value;
}