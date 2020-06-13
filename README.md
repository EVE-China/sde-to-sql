# sde-to-sql
将sde(STATIC DATA EXPORT)中的yaml转换成可以用于数据库的sql.

# ~~发现了同类型的项目, 开发暂停~~

~~https://www.fuzzwork.co.uk/dump/~~

同类型项目中没有处理多语言的数据, 只保留了英文, 所以本项目还是有存在意义的.

# 操作步骤

1.下载项目并安装依赖
```sh
git clone git@github.com:EVE-China/sde-to-sql.git
cd sde-to-sql
# 下载sde项目, 可能比较慢
git submodule init
git submodule update
# 安装依赖
npm install
```

2.生成对应数据库的sql脚本(目前只支持sqlite)

```sh
npm run start sqlite
```

到项目目录下的dist目录中, 寻找生成的sql脚本.

# 目前完成情况

## SQLite

- [x] Type
  - [x] 多语言支持
- [x] 蓝图
  - [x] 拷贝
  - [x] 发明
  - [x] 制造
  - [x] 材料研究
  - [x] 时间研究
  - [x] 反应

## PostgreSQL

- [x] Type
  - [x] 多语言支持
- [x] 蓝图
  - [x] 拷贝
  - [x] 发明
  - [x] 制造
  - [x] 材料研究
  - [x] 时间研究
  - [x] 反应