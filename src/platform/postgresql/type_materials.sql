CREATE TABLE eve.type_materials (
  typeID         integer,
  materialTypeID integer,
  quantity       integer,
	PRIMARY KEY(typeId, materialTypeID)
);