-- 蓝图
CREATE TABLE IF NOT EXISTS "blueprint" (
  "id"                  INTEGER,
  "maxProductionLimit"  INTEGER,
  PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "blueprint_activity" (
  "id"    INTEGER,
  "type"  INTEGER, -- 0 拷贝 1 发明 2 制造 3 材料研究 4 时间研究 5 反应
  "time"  INTEGER,
  PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "blueprint_material" (
  "id"           INTEGER,
  "activityType" INTEGER,
  "typeID"       INTEGER,
  "quantity"     INTEGER,
  PRIMARY KEY("id", "activityType", "typeID")
);
CREATE TABLE IF NOT EXISTS "blueprint_skill" (
  "id"           INTEGER,
  "activityType" INTEGER,
  "typeID"       INTEGER,
  "level"        INTEGER,
  PRIMARY KEY("id", "activityType", "typeID")
);
CREATE TABLE IF NOT EXISTS "blueprint_product" (
  "id"           INTEGER,
  "activityType" INTEGER,
  "probability"  REAL,
  "typeID"       INTEGER,
  "quantity"     INTEGER,
  PRIMARY KEY("id", "activityType", "typeID")
);