const express = require("express")
const router = express.Router()


// const teamsApi = require("./../services/teams-api.service")
// const api = new teamsApi()

router.get("/equipos", (req, res, next) => {
    res.render("teams/team-list")
  //  api
  //     .getAllTeams()
  //     .then(response => res.render('teams/teams-list', { teams: response.data }))
  //     .catch(err => console.log(err))
})



router.get("/equipos/detalles", (req, res, next) => {
    res.render("teams/team-details")
})

module.exports = router