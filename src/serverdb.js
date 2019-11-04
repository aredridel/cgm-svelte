import RxDB from "rxdb/dist/es";
import storage from "pouchdb-adapter-node-websql";
import serverPlugin from "rxdb/dist/es/plugins/server";
import configure from "./schema.js";

RxDB.plugin(storage);

RxDB.plugin(serverPlugin);

const db = RxDB.create({
  name: 'db',
  adapter: 'websql',
  multiInstance: false,
  queryChangeDetection: true,
});

export default configure(db);
