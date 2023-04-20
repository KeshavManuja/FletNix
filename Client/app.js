const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();

const helpers = require("./api/helpers/helpers");
// const authRoutes
// Add cors if required

app.use(express.json());
app.use(cors())
//Connecting to cluster
let dbConnection = async () => {
    global.db_connection = await helpers.dbConnection(process.env.MONGO_HOST, process.env.MONGO_DB_NAME)
}
dbConnection()

app.use('/', require('./api/routes'))
module.exports = app;