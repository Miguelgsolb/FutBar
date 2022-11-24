const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()
const Event = require('./../models/Event.model')
const uploader = require('./../config/uploader.config')

router.get('/', isLoggedIn, (req, res, next) => {

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
    .catch(error => next(error))
})


router.post('/participar/:event_id', isLoggedIn, (req, res, next) => {

  const { event_id } = req.params

  Event
    .findByIdAndUpdate(event_id, { $addToSet: { participants: req.session.currentUser._id } })
    .then(() => {
      res.redirect('/eventos')
    })
    .catch(error => next(error))
})

router.post('/desapuntar/:event_id', isLoggedIn, (req, res, next) => {

  const { event_id } = req.params

  Event
    .findByIdAndUpdate(event_id, { $pull: { participants: req.session.currentUser._id } })
    .then(() => {
      res.redirect('/perfil')
    })
    .catch(error => next(error))
})


router.get("/crear", isLoggedIn, (req, res, next) => {
  res.render("events/create-event")
})


router.post("/crear", isLoggedIn, uploader.single('imageField'), (req, res, next) => {

  const { name, address, eventName, description, date } = req.body
  const { _id: owner } = req.session.currentUser

  Event
    .create({ name, address, eventName, description, imageUrl: req.file.path, date, owner })
    .then(() => {
      res.redirect('/eventos')
    })
    .catch((error) => next(error))
})


router.get("/editar/:event_id", isLoggedIn, (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .then(event => {
      res.render('events/edit-event', event)
    })
    .catch(error => next(error))
})


router.post("/editar/:event_id", isLoggedIn, (req, res, next) => {

  const { name, address, eventName, description, date } = req.body
  const { event_id } = req.params

  Event
    .findByIdAndUpdate(event_id, { name, address, eventName, description, date })
    .then(() => {
      res.redirect(`/eventos`)
    })
    .catch((error) => next(error))
})


router.post('/eliminar/:event_id', (req, res) => {

  const { event_id } = req.params

  Event
    .findByIdAndDelete(event_id)
    .then(() => res.redirect('/perfil'))
    .catch(error => next(error))

})

router.get("/detalle/:event_id", (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .populate('comments')
    .then(userComments => {
      res.render('events/eventos-details', userComments)
    })
    .catch(error => next(error))

})



module.exports = router