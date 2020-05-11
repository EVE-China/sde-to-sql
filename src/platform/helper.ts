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

  protected abstract initBluePrint(): string;

  protected abstract initBluePrintData(): string;

  protected abstract initType(): string;

  protected abstract initTypeData(): string;
}