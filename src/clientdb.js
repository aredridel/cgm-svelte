import RxDB from "rxdb";
import httpAdapter from "pouchdb-adapter-http";
import idbAdapter from "pouchdb-adapter-idb";
import configure from "./schema.js";

RxDB.plugin(idbAdapter);
RxDB.plugin(httpAdapter);

const db = createDb();

async function createDb() {
  const db = await RxDB.create({
    name: 'foo',          
    adapter: 'idb',         
    multiInstance: true,     
    queryChangeDetection: true
  });

  return db;
}

export default configure(db);
