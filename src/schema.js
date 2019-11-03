const sgvSchema  ={
  title: "stored glucose values",
  version: 1,
  decription: "stored glucose values",
  type: "object",
  properties: {
    ts: {
      type: "number",
      index: true,
    },
    sgv: {
      type: "number"
    }
  },
  required: ["sgv", "ts"]
}

export default async function configure(dbP) {
    const db = await dbP;

    const sgv = await db.collection({
        name: 'sgv',
        schema: sgvSchema,
        autoMigrate: true,
        migrationStrategies: {
          1: doc => doc
        }
    });
    db.collections.sgv.$.subscribe(x => console.log('sgv', x))
    return db;
}
