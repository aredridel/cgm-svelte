import RxDB from "rxdb/dist/es";
import httpAdapter from "pouchdb-adapter-http";
import idbAdapter from "pouchdb-adapter-idb";
import configure from "./schema.js";

RxDB.plugin(idbAdapter);
RxDB.plugin(httpAdapter);

const db = createDb();

async function createDb() {
  const db = await RxDB.create({
    name: 'db',          
    adapter: 'idb',         
    queryChangeDetection: true
  });

  return db;
}

async function sync(dbP) {
  const db = await dbP;

  for (const k of Object.keys(db.collections)) {
    const remote = `http://localhost:4000/db/${k}`
    const r = db.collections[k].sync({
      options: {
        live: true,
        retry: true
      },
      remote
    });
  }

  window.db=db;

  return db;
}


export default sync(configure(db));
