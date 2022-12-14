const express = require("express")
const router = express.Router()
const teamsApi = require("./../services/teams-api.service")
const api = new teamsApi()


router.get("/:squad_id", (req, res, next) => {

    const { squad_id } = req.params

    api
        .getPlayersByTeam(squad_id)
        .then(response => {
            const { player } = response.data
            res.render('players/players-list', { player, squad_id })
        })
        .catch(error => next(error))
})


router.get("/detalle/:squad_id/:player_id", (req, res, next) => {

    const { squad_id, player_id } = req.params

    api
        .getPlayersByTeam(squad_id)
        .then(response => {

            const { player } = response.data
            const player_details = player.filter(onePlayer => player_id === onePlayer.id)

            res.render('players/players-details', player_details[0])
        })
        .catch(error => next(error))

})

module.exports = router