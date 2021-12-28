const express = require("express");
const book = require("../models/user.model");

const router = express.Router()

router.get('/', (req, res, next) => {
    book.find((err, books) => {
        if (err) return next(err)
        res.json(books)
    })
})

module.exports = router