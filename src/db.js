import RxDB from "rxdb";
import serverPlugin from "rxdb/plugins/server";
import levelpouch from 'pouchdb-adapter-leveldb';
import snapdb from "snap-db";

RxDB.plugin(serverPlugin);
RxDB.plugin(levelpouch); // leveldown adapters need the leveldb plugin to work

const db = RxDB.create({
  name:'foo',
  adapter: snapdb
});

export default db;

