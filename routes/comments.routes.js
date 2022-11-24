const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()
const Comments = require('./../models/Comments.model')
const Event = require('./../models/Event.model')

router.get("/", (req, res, next) => {

    Comments
        .find()
        .then(commentsFromDB => {
            res.render('events/events-details', { comments: commentsFromDB })
        })
        .catch((error) => next(error))

})

router.get("/crear/:event_id", isLoggedIn, (req, res, next) => {
    res.render("comments/create-comments", { id: req.params.event_id })
})

router.post("/crear/:event_id", isLoggedIn, (req, res, next) => {

    const { description } = req.body
    const { _id: owner } = req.session.currentUser
    const { event_id } = req.params

    Comments
        .create({ description, owner })
        .then((comment) => {

            return Event.findByIdAndUpdate(event_id, { $addToSet: { comments: comment._id } })
        })
        .then(() => {
            res.redirect(`/eventos/detalle/${event_id}`)
        })
        .catch((error) => next(error))
})

router.post("/borrar/:comment_id", isLoggedIn, (req, res, next) => {

    const { comment_id } = req.params

    Comments

        .findByIdAndDelete(comment_id)

        .then(() =>
            res.redirect(`/perfil`))
        .catch((error) => next(error))
})



module.exports = router