const express = require('express')
const router = express.Router()
const Event = require("../models/Event.model")
const { isLoggedIn } = require('../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

  Event
    .find({ owner: req.session.currentUser._id })
    .then(userEvents => {
      res.render('users/profile', {
        user: req.session.currentUser,
        isPresident: req.session.currentUser.role === "PRESIDENT",
        isManager: req.session.currentUser.role === "MANAGER",
        userEvents
      })
    })
    .catch(error => next(error))
})


module.exports = router