const express = require("express")
const router = express.Router()
const teamsApi = require("./../services/teams-api.service")
const api = new teamsApi()


router.get('/lista-jugadores', (req, res, next) => {
    res.render('players/players-list')
})










module.exports = router