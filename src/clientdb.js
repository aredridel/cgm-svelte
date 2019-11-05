import RxDB from "rxdb/dist/es";
import httpAdapter from "pouchdb-adapter-http";
import idbAdapter from "pouchdb-adapter-idb";
import configure from "./schema.js";

RxDB.plugin(idbAdapter);
RxDB.plugin(httpAdapter);

const db = createDb().then(configure);
const syncs = db.then(sync);

async function createDb() {
  const db = await RxDB.create({
    name: 'db',          
    adapter: 'idb',         
    queryChangeDetection: true
  });

  window.db=db;

  return db;
}

async function sync(db) {
  for (const k of Object.keys(db.collections)) {
    return Object.entries(db.collections).reduce((a, [k, v]) => (db.collections[k] ? { ...a, [k]: db.collections[k].sync({
      options: {
        live: true,
        retry: true
      },
      remote: `http://localhost:4000/db/${k}`
    })}: a), {});
  }
}

export default db;
export { syncs, db };
