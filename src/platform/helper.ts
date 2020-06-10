import { SqlGenerator } from "./sql_generator";

export abstract class AbstractSqlGenerator implements SqlGenerator {

  init(): string {
    let sql = this.initType();
    sql += '\n';
    sql += this.initBluePrint();
    return sql;
  }
  data(): string {
    let sql = this.initTypeData();
    sql += '\n';
    sql += this.initBluePrintData();
    return sql;
  }

  protected static typeIdsYamlPath = 'sde/fsd/typeIDs.yaml';

  protected static marketGroupsYamlPath = 'sde/fsd/marketGroups.yaml';
  
  protected static blueprintsYamlPath = 'sde/fsd/blueprints.yaml';

  /**
   * 生成蓝图相关的DDL脚本
   */
  protected abstract initBluePrint(): string;

  /**
   * 生成蓝图相关的DML脚本
   */
  protected abstract initBluePrintData(): string;

  /**
   * 生成type相关的DDL脚本
   */
  protected abstract initType(): string;

  /**
   * 生成type相关的DML脚本
   */
  protected abstract initTypeData(): string;
}