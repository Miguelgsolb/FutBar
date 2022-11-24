module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const usersRoutes = require("./user.routes")
    app.use("/perfil", usersRoutes)

    const eventsRoutes = require("./events.routes")
    app.use("/eventos", eventsRoutes)

    const teamsRoutes = require("./teams.routes")
    app.use("/equipos", teamsRoutes)

    const playersRoutes = require("./players.routes")
    app.use("/plantilla", playersRoutes)

    const infoRoutes = require("./info.routes")
    app.use('/resultados', infoRoutes)
}