const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()
const Event = require('./../models/Event.model')


router.get('/', isLoggedIn, (req, res) => {

  Event
    .find()
    .then(userEvents => {
      const updateEvent = userEvents.map((event) => {
        if (event.owner.toString() === req.session.currentUser._id) {
          event.isCurrentUser = true
        } else {
          event.isCurrentUser = false
        }
        return event
      })
      res.render('events/events-list', {
        user: req.session.currentUser,
        isPresident: req.session.currentUser.role === "PRESIDENT",
        isManager: req.session.currentUser.role === "MANAGER",
        userEvents: updateEvent
      })
    })
    .catch(err => console.log(err))
})


router.post('/participar/:event_id', isLoggedIn, (req, res, next) => {

  const { event_id } = req.params

  Event
    .findByIdAndUpdate(event_id, { $addToSet: { participants: req.session.currentUser._id } })
    .then(event => {
      res.redirect('/eventos')
    })
    .catch(err => console.log(err))
})


router.get("/crear", isLoggedIn, (req, res, next) => {
  res.render("events/create-event")
})


router.post("/crear", isLoggedIn, (req, res, next) => {

  const { name, address, eventName, description, date } = req.body
  const owner = req.session.currentUser._id

  Event
    .create({ name, address, eventName, description, date, owner })
    .then(() => {
      res.redirect('/eventos')
    })
    .catch((err) => console.log(err))
})


router.get("/editar/:event_id", isLoggedIn, (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .then(event => {
      res.render('events/edit-event', event)
    })
    .catch(err => console.log(err))
})


router.post("/editar/:event_id", isLoggedIn, (req, res, next) => {

  const { name, address, eventName, description, date } = req.body
  const { event_id } = req.params

  Event
    .findByIdAndUpdate(event_id, { name, address, eventName, description, date })
    .then(() => {
      res.redirect(`/eventos`)
    })
    .catch((err) => console.log(err))
})


router.post('/eliminar/:event_id', (req, res) => {

  const { event_id } = req.params

  Event
    .findByIdAndDelete(event_id)
    .then(() => res.redirect('/perfil'))
    .catch(err => console.log(err))

})

module.exports = router