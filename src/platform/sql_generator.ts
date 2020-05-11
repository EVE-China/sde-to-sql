import { SqliteGenerator } from "./sqlite";
import { getBluePrintInitSql } from "./sqlite/blueprint";

/**
 * sql生成器接口
 */
export interface SqlGenerator {

  /**
   * 获取用于初始化的sql
   */
  init(): string;

  /**
   * 获取用于更新操作的sql
   */
  data(): string;
}

/**
 * sql生成器工厂
 */
export class SqlGeneratorFactory {

  /**
   * 获取对应数据库的生成器
   * @param db 数据库名称
   */
  static getGenerator(db: string): SqlGenerator {

    switch(db) {
      case 'sqlite':
        return new SqliteGenerator();
      default:
        throw new Error('尚为支持的数据库');
    }

  }
}