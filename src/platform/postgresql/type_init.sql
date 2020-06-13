DROP SCHEMA IF EXISTS eve CASCADE;
CREATE SCHEMA eve;

CREATE TABLE eve."type" (
  "id"                      integer,
  "groupID"                 integer,
  "mass"                    real,
  "portionSize"             integer,
  "published"               boolean,
  "volume"                  real,
  "radius"                  real,
  "graphicID"               integer,
  "soundID"                 integer,
  "iconID"                  integer,
  "raceID"                  integer,
  "sofFactionName"          varchar(5000),
  "basePrice"               real,
  "marketGroupID"           real,
  "capacity"                real,
  "metaGroupID"             integer,
  "variationParentTypeID"   integer,
  "factionID"               integer,
  "sofMaterialSetID"        integer,
  PRIMARY KEY("id")
);

CREATE TABLE eve."type_i18n" (
	"typeId"       integer,
	"key"      varchar(50), -- name, description
	"language" varchar(20), -- zh
	"value"	   varchar(5000),
	PRIMARY KEY("typeId", "key", "language")
);

-- TODO type_masteries
-- TODO type_traits

CREATE TABLE eve."market_group" (
	"id"            integer,
	"hasTypes"      integer,
	"icon"          integer,
	"parentGroupID"	integer,
	PRIMARY KEY("id")
);

CREATE TABLE eve."market_group_i18n" (
	"id"       integer,
	"key"      varchar(50), -- name, description
	"language" varchar(20), -- zh
	"value"	   varchar(5000),
	PRIMARY KEY("id", "key", "language")
);

