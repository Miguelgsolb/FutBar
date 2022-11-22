const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()
const Event = require('./../models/Event.model')


router.get('/eventos', isLoggedIn, (req, res) => {

  Event
    .find()
    .then(userEvents => {
      res.render('events/events-list', {
        user: req.session.currentUser,
        isPresident: req.session.currentUser.role === "PRESIDENT",
        isManager: req.session.currentUser.role === "MANAGER",
        userEvents
      })
    })
    .catch(err => console.log(err))
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



//-----
router.get("/eventos/editar/:event_id", isLoggedIn, (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .then(event => {
      res.render('events/edit-event', event)
    })
    .catch(err => console.log(err))
})


router.post("/eventos/editar/:event_id", isLoggedIn, (req, res, next) => {

  const { name, address, eventName, description, date } = req.body
  const { event_id } = req.params

  Event
    .findByIdAndUpdate(event_id, { name, address, eventName, description, date })
    .then(() => {
      res.redirect(`/eventos`)
    })
    .catch((err) => console.log(err))
})

//----


router.post('/eventos/eliminar/:event_id', (req, res) => {

  const { event_id } = req.params

  Event
    .findByIdAndDelete(event_id)
    .then(() => res.redirect('/eventos'))
    .catch(err => console.log(err))

})

module.exports = router