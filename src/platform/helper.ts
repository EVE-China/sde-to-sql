import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { SqlGenerator } from "./sql_generator";
import { ActivityType } from '../enum';

export abstract class AbstractSqlGenerator implements SqlGenerator {

  init(): string {
    let sql = this.initType();
    sql += '\n';
    sql += this.initBluePrint();
    sql += '\n';
    sql += this.initTypeMaterials();
    return sql;
  }

  data(): string {
    let sql = this.initTypeData();
    sql += '\n';
    sql += this.initBluePrintData();
    sql += '\n';
    sql += this.initTypeMaterialsData();
    return sql;
  }

  protected static typeIdsYamlPath = 'sde/sde/fsd/typeIDs.yaml';

  protected static marketGroupsYamlPath = 'sde/sde/fsd/marketGroups.yaml';
  
  protected static blueprintsYamlPath = 'sde/sde/fsd/blueprints.yaml';

  protected static typeMaterialsYamlPath = 'sde/sde/fsd/typeMaterials.yaml';

  /**
   * 生成type相关的DDL脚本
   */
  protected abstract initType(): string;

  /**
   * 生成type相关的DML脚本
   */
  private initTypeData(): string {
    const doc = yaml.safeLoad(fs.readFileSync(AbstractSqlGenerator.typeIdsYamlPath, 'utf8'));
    let sql = '';
    for (const id in doc) {
      const type = doc[id];
      sql += this.saveType(Number.parseInt(id), type);
    }
    return sql;
  }

  /**
   * 将type存入到sql脚本中
   * @param typeId 编号
   * @param type   对象
   */
  private saveType(typeId: number, type: any): string {
    if (null == type) {
      return '';
    }
    let sql = this.getTypeSQL(typeId, type);
    // 名称多语言部分
    sql += '\n' + this.saveTypeI18n(typeId, 'name', type.name);
    // 描述多语言部分
    sql += '\n' + this.saveTypeI18n(typeId, 'description', type.description);
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
  private saveTypeI18n(typeId: number, key: string, arrays: any): string {
    if (null == arrays) {
      return '';
    }
    let sql = '';
    for (const language in arrays) {
      const value = arrays[language];
      if (sql.length != 0) {
        sql += '\n';
      }
      sql += this.getTypeI18n(typeId, key, language, value);
    }
    return sql;
  }

  /**
   * 生成蓝图相关的DDL脚本
   */
  protected abstract initBluePrint(): string;

  /**
   * 生成蓝图相关的DML脚本
   */
  private initBluePrintData(): string {
    const doc = yaml.safeLoad(fs.readFileSync(AbstractSqlGenerator.blueprintsYamlPath, 'utf8'));
    let sql = '';
    for (const id in doc) {
      const blueprint = doc[id];
      sql += this.saveBluePrint(Number.parseInt(id), blueprint);
    }
    return sql;
  }

  /**
   * 将蓝图存入到sqlite中
   * @param typeId    蓝图编号
   * @param bluePrint 蓝图对象
   */
  private saveBluePrint(typeId: number, bluePrint: any): string {
    if (null == bluePrint) {
      return '';
    }
    let sql = this.getBluePrintSQL(typeId, bluePrint.maxProductionLimit);
    const activities = bluePrint.activities;
    if (null == activities) {
      return '';
    }
    // 拷贝
    if (null != activities.copying) {
      sql += '\n' + this.saveBluePrintActivity(typeId, ActivityType.Copying, activities.copying);
    }
    // 发明
    if (null != activities.invention) {
      sql += '\n' + this.saveBluePrintActivity(typeId, ActivityType.Invention, activities.invention);
    }
    // 制造
    if (null != activities.manufacturing) {
      sql += '\n' + this.saveBluePrintActivity(typeId, ActivityType.Manufacturing, activities.manufacturing);
    }
    // 材料研究
    if (null != activities.research_material) {
      sql += '\n' + this.saveBluePrintActivity(typeId, ActivityType.ResearchMaterial, activities.research_material);
    }
    // 时间研究
    if (null != activities.research_time) {
      sql += '\n' + this.saveBluePrintActivity(typeId, ActivityType.ResearchTime, activities.research_time);
    }
    // 反应
    if (null != activities.reaction) {
      sql += '\n' + this.saveBluePrintActivity(typeId, ActivityType.Reaction, activities.reaction);
    }
    sql += '\n';
    return sql;
  }

  /**
   * 将活动存入到sql脚本中
   * 
   * @param typeId    蓝图编号
   * @param activity  活动
   */
  private saveBluePrintActivity(typeId :number, type: ActivityType, activity: any): string {
    let sql = '';
    if (null == activity) {
      return sql;
    }
    sql += this.getBluePrintActivitySQL(typeId, type, activity.time);
    // 材料
    if (null != activity.materials) {
      sql += '\n' + this.saveBluePrintMaterials(typeId, type, activity.materials);
    }
    // 技能
    if (null != activity.skills) {
      sql += '\n' + this.saveBluePrintSkills(typeId, type, activity.skills);
    }
    // 产品
    if (null != activity.products) {
      sql += '\n' + this.saveBluePrintProducts(typeId, type, activity.products)
    }
    return sql;
  }

  /**
   * 保存蓝图材料
   * 
   * @param typeId      蓝图编号
   * @param type        活动类型
   * @param materials   材料集合
   */
  private saveBluePrintMaterials(typeId: number, type: ActivityType, materials: any): string {
    let sql = '';
    if (null == materials || materials.length == 0) {
      return sql;
    }
    for (const material of materials) {
      if (sql.length != 0) {
        sql += '\n';  
      }
      sql += this.getBluePrintMaterialSQL(typeId, type, material.typeID, material.quantity);
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
  private saveBluePrintSkills(typeId: number, type: ActivityType, skills: any): string {
    let sql = '';
    if (null == skills || skills.length == 0) {
      return sql;
    }
    for (const skill of skills) {
      if (sql.length != 0) {
        sql += '\n';  
      }
      sql += this.getBluePrintSkillSQL(typeId, type, skill.typeID, skill.level)
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
  private saveBluePrintProducts(typeId: number, type: ActivityType, products: any): string {
    let sql = '';
    if (null == products || products.length == 0) {
      return sql;
    }
    for (const product of products) {
      if (sql.length != 0) {
        sql += '\n';  
      }
      const probability = product.probability != null ? product.probability : "NULL";
      sql += this.getBluePrintProductSQL(typeId, type, probability, product.typeID, product.quantity);
    }
    return sql;
  }

  /**
   * 生成物品精炼相关表
   */
  protected abstract initTypeMaterials(): string;

  /**
   * 生成物品精炼相关数据
   */
  private initTypeMaterialsData() {
    const doc = yaml.safeLoad(fs.readFileSync(AbstractSqlGenerator.typeMaterialsYamlPath, 'utf8'));
    let sql = '';
    for (const id in doc) {
      const record = doc[id];
      if (null != record && null != record.materials) {
        sql += this.saveTypeMaterials(Number.parseInt(id), record.materials);
      }
    }
    return sql;
  }

  private saveTypeMaterials(typeId: number, materials: any) {
    let sql = '';
    for (const item of materials) {
      sql += this.getTypeMaterial(typeId, item.materialTypeID, item.quantity) + '\n';
    }
    return sql;
  }

  /**
   * 获取typeSQL
   * 
   * @param typeId typeId
   * @param type   type对象
   */
  protected abstract getTypeSQL(typeId: number, type: any): string;

  /**
   * 获取type多语言SQL
   * 
   * @param typeId   typeId
   * @param key      key
   * @param language 语言
   * @param value    内容
   */
  protected abstract getTypeI18n(typeId: number, key: string, language: string, value: string): string;

  /**
   * 获取蓝图SQL
   */
  protected abstract getBluePrintSQL(typeId: number, maxProductionLimit: number): string;

  /**
   * 获取蓝图活动SQL
   * 
   * @param typeId 蓝图编号
   * @param type   活动类型
   * @param time   时间
   */
  protected abstract getBluePrintActivitySQL(typeId: number, type: ActivityType, time: number): string;

  /**
   * 获取蓝图活动材料SQL
   * 
   * @param typeId     蓝图编号
   * @param type       活动类型
   * @param materialId 材料编号
   * @param quantity   材料数量
   */
  protected abstract getBluePrintMaterialSQL(typeId: number, type: ActivityType, materialId: number, quantity: number): string;

  /**
   * 获取蓝图活动技能SQL
   * 
   * @param typeId  蓝图编号
   * @param type    活动类型
   * @param skillId 技能编号
   * @param level   技能等级
   */
  protected abstract getBluePrintSkillSQL(typeId: number, type: ActivityType, skillId: number, level: number): string;

  /**
   * 获取蓝图活动产品SQL
   * 
   * @param typeId      蓝图编号
   * @param type        活动类型
   * @param probability 可能性
   * @param materialId  产品编号
   * @param quantity    产品数量
   */
  protected abstract getBluePrintProductSQL(typeId: number, type: ActivityType, probability: number, productId: number, quantity: number): string;

  /**
   * 获取物品精炼材料SQL
   * @param typeId         物品编号
   * @param materialTypeID 材料编号
   * @param quantity       材料数量
   */
  protected abstract getTypeMaterial(typeId: number, materialTypeID: number, quantity: number): string;
}