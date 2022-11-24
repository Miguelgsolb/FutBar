const express = require('express')
const router = express.Router()
const Event = require("../models/Event.model")
const { isLoggedIn } = require('../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

  const promises = [
    Event.find({ owner: req.session.currentUser._id }).populate('participants'),
    Event.find({ participants: { $in: [req.session.currentUser._id] } })
  ]

  Promise
    .all(promises)
    .then(([userEvents, joinEvents]) => {
      res.render('users/profile', {
        user: req.session.currentUser,
        isPresident: req.session.currentUser.role === "PRESIDENT",
        isManager: req.session.currentUser.role === "MANAGER",
        userEvents,
        joinEvents
      })
    })
    .catch(error => next(error))


})


module.exports = router



