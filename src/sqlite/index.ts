import { ActivityType } from '../enum';

/**
 * 根据Fields生成表创建sql
 * 类型为object的字段会被跳过
 * 
 * @deprecated 生成的sql并不能直接使用
 * @param tableName 表名
 * @param primaryKey 表主键
 * @param fields 字段
 */
export function generateDDLByFields(tableName: string, primaryKey: string, fields: { [key: string]: string }) {

  let sql = `CREATE TABLE "${tableName}" (
    "${primaryKey}"	INTEGER`;
  for (const field in fields) {
    const type = fields[field];
    if ('object' !== type) {
      sql += `,
      "${field}"	${toSqliteType(type)}`;
    } else {
      console.warn(`${field}类型为object, 已跳过`);
    }
  }
  sql += `,
  PRIMARY KEY("${primaryKey}")
  );`;
  return sql;
}

function toSqliteType(type: string): string {
  switch(type) {
    case 'number':
      return "REAL";
    case 'boolean':
      return "BOOLEAN";
    case 'string':
      return "TEXT";
    default:
      throw new Error(`尚未支持的类型:${type}`);
  }
}

/**
 * 将蓝图存入到sqlite中
 * @param typeId    蓝图编号
 * @param bluePrint 蓝图对象
 */
export function saveBluePrint(typeId: string, bluePrint: any): string {
  let sql = '';
  if (null == bluePrint) {
    return sql;
  }
  sql += `REPLACE INTO "blueprint"("id", "maxProductionLimit") VALUES("${typeId}", ${bluePrint.maxProductionLimit});`;
  
  const activities = bluePrint.activities;
  if (null == activities) {
    return '';
  }
  // 拷贝
  if (null != activities.copying) {
    sql += '\n' + saveBluePrintActivity(typeId, ActivityType.Copying, activities.copying);
  }
  // 发明
  if (null != activities.invention) {
    sql += '\n' + saveBluePrintActivity(typeId, ActivityType.Invention, activities.invention);
  }
  // 制造
  if (null != activities.manufacturing) {
    sql += '\n' + saveBluePrintActivity(typeId, ActivityType.Manufacturing, activities.manufacturing);
  }
  // 材料研究
  if (null != activities.research_material) {
    sql += '\n' + saveBluePrintActivity(typeId, ActivityType.ResearchMaterial, activities.research_material);
  }
  // 时间研究
  if (null != activities.research_time) {
    sql += '\n' + saveBluePrintActivity(typeId, ActivityType.ResearchTime, activities.research_time);
  }
  // 反应
  if (null != activities.reaction) {
    sql += '\n' + saveBluePrintActivity(typeId, ActivityType.Reaction, activities.reaction);
  }
  sql += '\n';
  return sql;
}

/**
 * 将活动存入到sqlite中
 * 
 * @param typeId    蓝图编号
 * @param activity  活动
 */
function saveBluePrintActivity(typeId:string, type: ActivityType, activity: any): string {
  let sql = '';
  if (null == activity) {
    return sql;
  }
  sql += _saveBluePrintActivity(typeId, type, activity.time);
  // 材料
  if (null != activity.materials) {
    sql += '\n' + saveBluePrintMaterials(typeId, type, activity.materials);
  }
  // 技能
  if (null != activity.skills) {
    sql += '\n' + saveBluePrintSkills(typeId, type, activity.skills);
  }
  // 产品
  if (null != activity.products) {
    sql += '\n' + saveBluePrintProducts(typeId, type, activity.products)
  }
  return sql;
}

/**
 * 保存蓝图活动
 * 
 * @param typeId 蓝图编号
 * @param type   活动类型
 * @param time   时间
 */
function _saveBluePrintActivity(typeId: string, type: ActivityType, time: number): string {
  return `REPLACE INTO "blueprint_activity"("id", "type", "time") VALUES("${typeId}", ${type}, ${time});`;
}

/**
 * 保存蓝图材料
 * 
 * @param typeId      蓝图编号
 * @param type        活动类型
 * @param materials   材料集合
 */
function saveBluePrintMaterials(typeId: string, type: ActivityType, materials: any): string {
  let sql = '';
  if (null == materials || materials.length == 0) {
    return sql;
  }
  for (const material of materials) {
    if (sql.length != 0) {
      sql += '\n';  
    }
    sql += `REPLACE INTO "blueprint_material"("id", "activityType", "typeID", "quantity") VALUES("${typeId}", ${type}, ${material.typeID}, ${material.quantity});`;
  }
  return sql;
}

/**
 * 保存蓝图技能
 * 
 * @param typeId   蓝图编号
 * @param type     活动类型
 * @param skills   技能集合
 */
function saveBluePrintSkills(typeId: string, type: ActivityType, skills: any): string {
  let sql = '';
  if (null == skills || skills.length == 0) {
    return sql;
  }
  for (const skill of skills) {
    if (sql.length != 0) {
      sql += '\n';  
    }
    sql += `REPLACE INTO "blueprint_skill"("id", "activityType", "typeID", "level") VALUES("${typeId}", ${type}, ${skill.typeID}, ${skill.level});`;
  }
  return sql;
}

/**
 * 保存蓝图产品
 * 
 * @param typeId   蓝图编号
 * @param type     活动类型
 * @param products 产品集合
 */
function saveBluePrintProducts(typeId: string, type: ActivityType, products: any): string {
  let sql = '';
  if (null == products || products.length == 0) {
    return sql;
  }
  for (const product of products) {
    if (sql.length != 0) {
      sql += '\n';  
    }
    const probability = product.probability != null ? product.probability : "NULL";
    sql += `REPLACE INTO "blueprint_product"("id", "activityType", "probability", "typeID", "quantity") VALUES("${typeId}", ${type}, ${probability}, ${product.typeID}, ${product.quantity});`;
  }
  return sql;
}