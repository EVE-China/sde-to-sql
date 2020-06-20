-- 蓝图
CREATE TABLE eve.blueprint (
  id                  integer,
  maxProductionLimit  integer,
  PRIMARY KEY(id)
);
CREATE TABLE eve.blueprint_activity (
  id    integer,
  type  integer, -- 0 拷贝 1 发明 2 制造 3 材料研究 4 时间研究 5 反应
  time  integer,
  PRIMARY KEY(id, type)
);
CREATE TABLE eve.blueprint_material (
  id           integer,
  activityType integer,
  typeID       integer,
  quantity     integer,
  PRIMARY KEY(id, activityType, typeID)
);
-- 由于sde中的数据有重复, 所以取消蓝图技能表的主键
CREATE TABLE eve.blueprint_skill (
  id           integer,
  activityType integer,
  typeID       integer,
  level        integer
);
CREATE TABLE eve.blueprint_product (
  id           integer,
  activityType integer,
  probability  real,
  typeID       integer,
  quantity     integer,
  PRIMARY KEY(id, activityType, typeID)
);