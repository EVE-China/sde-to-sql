CREATE TABLE "type" (
	"id"	INTEGER,
	"basePrice"	REAL,
	"graphicID"	INTEGER,
	"marketGroupID"	INTEGER,
	"portionSize"	INTEGER,
	"published"	INTEGER,
	"sofFactionName"	TEXT,
	"volume"	REAL,
	PRIMARY KEY("id")
);

CREATE TABLE "type_i18n" (
	"id"	INTEGER,
	"key"	TEXT NOT NULL,
	"language"	TEXT NOT NULL,
	"value"	INTEGER NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "market_group" (
	"id"	INTEGER,
	"hasTypes"	INTEGER,
	"icon"	INTEGER,
	"parentGroupID"	INTEGER,
	PRIMARY KEY("id")
);

CREATE TABLE "market_group_i18n" (
	"id"	INTEGER,
	"key"	TEXT,
	"language"	TEXT,
	"value"	TEXT,
	PRIMARY KEY("id")
);
