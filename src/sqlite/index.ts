
/**
 * 根据Fields生成表创建sql
 * 类型为object的字段会被跳过
 * 
 * @param tableName 表名
 * @param primaryKey 表主键
 * @param fields 字段
 */
export function generateDDLByFields(tableName: string, primaryKey: string, fields: { [key: string]: string }) {

  let sql = `CREATE TABLE "${tableName}" (
    "${primaryKey}"	INTEGER`;
  Object.keys(fields).forEach(field => {
    const type = fields[field];
    if ('object' !== type) {
      sql += `,
      "${field}"	${toSqliteType(type)}`;
    } else {
      console.warn(`${field}类型为object, 已跳过`);
    }
  });
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