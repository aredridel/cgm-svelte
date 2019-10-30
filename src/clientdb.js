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

async function sync(dbP) {
  const db = await dbP;

  for (const k of Object.keys(db.collections)) {
    const remote = `http://localhost:3000/db/${k}`
    console.log(remote) ;
    const r = db.collections[k].sync({
      remote
    });
  }

  window.db=db;

  return db;
}


export default sync(configure(db));
