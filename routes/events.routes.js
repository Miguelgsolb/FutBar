const express = require('express')
const { isLoggedIn, checkRoles } = require('../middleware/route-guard')
const router = express.Router()
const Event = require('./../models/Event.model')


router.get("/eventos", isLoggedIn, (req, res, next) => {

  Event
    .find()
    .then(event => {
      res.render("events/events-list", { event })
    })
    .catch((err) => console.log(err))
})


router.get("/eventos/crear", isLoggedIn, (req, res, next) => {
  res.render("events/create-event")
})


router.post("/eventos/crear", isLoggedIn, (req, res, next) => {

  const { name, address, eventName, description, date } = req.body
  const owner = req.session.currentUser._id

  Event
    .create({ name, address, eventName, description, date, owner })
    .then(() => {
      res.redirect('/eventos')
    })
    .catch((err) => console.log(err))
})




module.exports = router