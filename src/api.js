import polka from "polka";

export default polka()
    .use('/', (req, res) => res.end('API'));
