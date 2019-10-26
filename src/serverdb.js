import storage from "pouchdb-adapter-node-websql";

// This is shenanigans
import PouchDB from "pouchdb-core";
PouchDB.preferredAdapters.push('websql');
PouchDB.plugin(storage);

import RxDB from "rxdb";

RxDB.plugin(storage);

import serverPlugin from "rxdb/plugins/server";
RxDB.plugin(serverPlugin);

const db = RxDB.create({
  name: 'db',
  adapter: 'websql',
  multiInstance: true,
  queryChangeDetection: true,
});

import configure from "./schema.js";

export default configure(db);
