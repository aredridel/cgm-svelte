import polka from "polka";

const mod = (async () => {

    return polka()
        .use('/', async (req, res) => {
            return res.end(await db.query('select').where(["age", "=", 20]).exec())
        })
})();

export default mod;
