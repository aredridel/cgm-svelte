const sgvSchema  ={
  title: "stored glucose values",
  version: 0,
  decription: "stored glucose values",
  type: "object",
  properties: {
    ts: {
      type: "number",
    },
    sgv: {
      type: "number"
    }
  },
  required: ["sgv", "ts"]
}

export default async function configure(dbP) {
    const db = await dbP;

    await db.collection({
        name: 'sgv',
        schema: sgvSchema
    });

    db.collections.sgv.$.subscribe(x => console.log('sgv', x))

    console.warn('x', await db.collections.sgv.find().exec());

    return db;
}
