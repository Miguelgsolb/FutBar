const express = require("express")
const router = express.Router()

const teamsApi = require("./../services/teams-api.service")
const api = new teamsApi()

router.get("/", (req, res, next) => {
    api
        .getAllInfo()
        .then(response => {
            res.render('info/info-matches', response.data)
        })
        .catch(error => next(error))
})

router.get("/clasificacion", (req, res, next) => {
    api
        .getClassification()
        .then(response => {
            res.render('info/classification', response.data)
        })
        .catch(error => next(error))
})

module.exports = router