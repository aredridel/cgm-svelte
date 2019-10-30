import storage from "pouchdb-adapter-node-websql";
import PouchDB from "pouchdb-core";
import RxDB from "rxdb";
import serverPlugin from "rxdb/plugins/server";
import configure from "./schema.js";

RxDB.PouchDB.__defaults= { prefix: 'db/' }

// This is shenanigans
PouchDB.plugin(storage);

RxDB.plugin(storage);

RxDB.plugin(serverPlugin);

const db = RxDB.create({
  name: 'db/',
  adapter: 'websql',
  multiInstance: true,
  queryChangeDetection: true,
});

export default configure(db);
