import polka from "polka";
import db from "./db.js";

export default db.then(db => polka()
    .use(serveDB(db))
    .use('/', async (req, res) => res.end(await db.query('select').where(["age", "=", 20]).exec()))
);
