CREATE TABLE "type" (
  "id"                      INTEGER,
  "groupID"                 INTEGER,
  "mass"                    REAL,
  "portionSize"             INTEGER,
  "published"               BOOLEAN,
  "volume"                  REAL,
  "radius"                  REAL,
  "graphicID"               INTEGER,
  "soundID"                 INTEGER,
  "iconID"                  INTEGER,
  "raceID"                  INTEGER,
  "sofFactionName"          TEXT,
  "basePrice"               REAL,
  "marketGroupID"           REAL,
  "capacity"                REAL,
  "metaGroupID"             INTEGER,
  "variationParentTypeID"   INTEGER,
  "factionID"               INTEGER,
  "sofMaterialSetID"        INTEGER,
  PRIMARY KEY("id")
);

CREATE TABLE "type_i18n" (
	"id"       INTEGER,
	"key"      TEXT, -- name, description
	"language" TEXT, -- zh
	"value"	   INTEGER,
	PRIMARY KEY("id", "key", "language")
);

-- TODO type_masteries
-- TODO type_traits

CREATE TABLE "market_group" (
	"id"            INTEGER,
	"hasTypes"      INTEGER,
	"icon"          INTEGER,
	"parentGroupID"	INTEGER,
	PRIMARY KEY("id")
);

CREATE TABLE "market_group_i18n" (
	"id"       INTEGER,
	"key"      TEXT, -- name, description
	"language" TEXT, -- zh
	"value"    TEXT,
	PRIMARY KEY("id", "key", "language")
);

-- 蓝图
CREATE TABLE "blueprint" (
  "id"                  INTEGER,
  "blueprintTypeID"     INTEGER,
  "maxProductionLimit"  INTEGER,
  PRIMARY KEY("id")
);
CREATE TABLE "blueprint_activity" (
  "id"    INTEGER,
  "type"  INTEGER, -- 0 拷贝 1 发明 2 制造 3 材料研究 4 时间研究
  "time"  INTEGER,
  PRIMARY KEY("id")
);
CREATE TABLE "blueprint_material" (
  "id"           INTEGER,
  "activityType" INTEGER,
  "typeID"       INTEGER,
  "quantity"     INTEGER,
  PRIMARY KEY("id", "activityType", "typeID")
);
CREATE TABLE "blueprint_skill" (
  "id"           INTEGER,
  "activityType" INTEGER,
  "typeID"       INTEGER,
  "level"        INTEGER,
  PRIMARY KEY("id", "activityType", "typeID")
);
CREATE TABLE "blueprint_product" (
  "id"           INTEGER,
  "activityType" INTEGER,
  "probability"  REAL,
  "typeID"       INTEGER,
  "quantity"     INTEGER,
  PRIMARY KEY("id", "activityType", "typeID")
);