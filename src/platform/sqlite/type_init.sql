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

