import polka from "polka";
import dbP from "@app/db";

const mod = (async () => {

    const db = await dbP;

    const { app } = db.server({
        startServer: false
    });

    return polka()
        .use('/db', app)
        .use('/', async (req, res) => {
            return res.end(await db.query('select').where(["age", "=", 20]).exec())
        })
	console.log('hello');
})();

export default mod;
