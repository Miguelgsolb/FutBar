const express = require("express")
const router = express.Router()

const teamsApi = require("./../services/teams-api.service")
const api = new teamsApi()

router.get("/", (req, res, next) => {

  api
    .getAllTeams()
    .then(response => {
      res.render('teams/teams-list', response.data)
    })
    .catch(error => next(error))
})

module.exports = router