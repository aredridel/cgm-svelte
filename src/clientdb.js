import RxDB from "rxdb";
import httpAdapter from "pouchdb-adapter-http";
import idbAdapter from "pouchdb-adapter-idb";

RxDB.plugin(idbAdapter);
RxDB.plugin(httpAdapter);

const db = RxDB.create({
  name: 'foo',          
  adapter: 'idb',         
  multiInstance: true,     
  queryChangeDetection: true
});

export default db;
