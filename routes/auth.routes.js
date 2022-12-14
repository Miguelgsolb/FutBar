const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const uploader = require('./../config/uploader.config')
const saltRounds = 10

const { isLoggedOut } = require('../middleware/route-guard')


router.get('/registro', (req, res, next) => res.render('auth/signup'))

router.post('/registro', uploader.single('imageField'), (req, res, next) => {

  const { userPwd } = req.body

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ ...req.body, imageUrl: req.file.path, password: hashedPassword }))
    .then(createdUser => res.redirect('/iniciar-sesion'))
    .catch(error => next(error))
})


router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))

router.post('/iniciar-sesion', (req, res, next) => {

  const { email, userPwd } = req.body

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
        return
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
        return
      } else {
        req.session.currentUser = user
        res.redirect("/perfil")
      }
    })
    .catch(error => next(error))
})


router.get('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router