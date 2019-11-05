import express from "express";

const mod = (async () => {

    return express()
        .use('/', async (req, res) => {
            return res.end(await db.query('select').where(["age", "=", 20]).exec())
        })
})();

export default mod;
