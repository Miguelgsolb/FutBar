const express = require('express')
const router = express.Router()
const Event = require("../models/Event.model")
const { isLoggedIn } = require('../middleware/route-guard')

router.get('/perfil', isLoggedIn, (req, res) => {

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
    .catch(err => console.log(err))
})

// router.get('/perfil', isLoggedIn, (req, res, next) => {
//   const currentUser = req.session.currentUser;
//   const isPresident = currentUser.role === "PRESIDENT";
//   const isManager = currentUser.role === "MANAGER";
//   if (isPresident || isManager) {
//     Event
//       .find({ owner: currentUser._id })
//       .then(userEvents => {
//         res.render('users/profile', {
//           user: currentUser,
//           isPresident,
//           isManager,
//           userEvents
//         })
//       })
//       .catch(err => console.log(err))
//   } else {
//     Event
//       .find({ participants: currentUser })
//       .then((userEvents) => {
//         console.log(userEvents);
//         res.render('users/profile', {
//           user: currentUser,
//           isPresident,
//           isManager,
//           userEvents
//         })
//       })
//       .catch(err => console.log(err))
//   }
// })



module.exports = router