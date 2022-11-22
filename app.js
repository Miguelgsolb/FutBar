require("dotenv").config()
require("./db")

const express = require("express")

const hbs = require("hbs")

const app = express()

require("./config")(app)


const capitalize = require("./utils/capitalize")
const projectName = "FutBar_app"

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

require("./config/session.config")(app)

const indexRoutes = require("./routes/index.routes")
app.use("/", indexRoutes)

const eventsRoutes = require("./routes/events.routes")
app.use("/", eventsRoutes)

const teamsRoutes = require("./routes/teams.routes")
app.use("/", teamsRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes)

const usersRoutes = require('./routes/user.routes')
app.use('/', usersRoutes)

const playersRoutes = require('./routes/players.routes')
app.use('/', playersRoutes)


require("./error-handling")(app)

module.exports = app
