require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)

const capitalize = require("./utils/capitalize")
const projectName = "FutBar_app"
app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`
require("./config/session.config")(app)

require('./routes')(app)
require("./error-handling")(app)

module.exports = app