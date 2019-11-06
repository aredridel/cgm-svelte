const sgvSchema = {
  title: "stored glucose values",
  version: 2,
  decription: "stored glucose values",
  type: "object",
  properties: {
    ts: {
      type: "number",
      index: true
    },
    sgv: {
      type: "number"
    },
    device: {
      type: "string"
    },
    direction: {
      enum: [
        "NONE",
        "ExtremeRise",
        "FastRise",
        "Rise",
        "Flat",
        "Fall",
        "FastFall",
        "ExtremeFall",
        "NOT COMPUTABLE",
        "RATE OUT OF RANGE"
      ],
      default: "NONE"
    }
  },
  required: ["sgv", "ts"]
};

export default async function configure(dbP) {
  const db = await dbP;

  const sgv = await db.collection({
    name: "sgv",
    schema: sgvSchema,
    autoMigrate: true,
    migrationStrategies: {
      1: doc => doc,
      2: doc => Object.assign({}, doc, { direction: "NONE" })
    }
  });
  db.collections.sgv.$.subscribe(x => console.log("sgv", x));
  return db;
}
