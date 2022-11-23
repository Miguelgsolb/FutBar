const express = require('express')
const router = express.Router()
const Event = require("../models/Event.model")
const { isLoggedIn } = require('../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

  let userEvents
  Event
    .find({ owner: req.session.currentUser._id })
    .populate('participants')
    .then(ownedEvents => {
      userEvents = ownedEvents
      return Event.find({ participants: { $in: [req.session.currentUser._id] } })

    })
    .then((joinEvents) => {
      console.log(joinEvents)
      res.render('users/profile', {
        user: req.session.currentUser,
        isPresident: req.session.currentUser.role === "PRESIDENT",
        isManager: req.session.currentUser.role === "MANAGER",
        userEvents,
        joinEvents

      })

    })
    .catch(err => console.log(err))
})


module.exports = router