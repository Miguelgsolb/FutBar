const express = require("express")
const router = express.Router()


const teamsApi = require("./../services/teams-api.service")
const api = new teamsApi()

router.get("/equipos", (req, res, next) => {

  api
    .getAllTeams()
    .then(response => {
      console.log('-----', response.data)
      res.render('teams/teams-list', response.data)
    })
    .catch(err => console.log(err))
})







module.exports = router