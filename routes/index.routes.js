const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index")
})

// router.get("/perfil", isLoggedIn, (req, res, next) => {
//   res.render("users/profile", { user: req.session.currentUser })
// })



// router.get("/admin", isLoggedIn, checkRoles("PRESIDENTE", "ENTRENADOR"), (req, res, next) => {
//     res.render("users/profile")
//   }
// )



module.exports = router
