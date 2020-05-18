'use strict';
const router = require('express').Router();
const booksService = require('../../services/books');

router.get('/', (req, res) => {
    booksService.getAll()
        .then(result => {
            // console.log("books from api....")
                res.set("Cache-Control", "max-age=120");
                res.json(result.response);
            }
        );
});

router.get('/:id', (req, res) => {
    booksService.getById(req.params.id)
        .then(result => {
                // console.log("books from api....")
                res.set("Cache-Control", "max-age=120");
                res.json(result.response);
            }
        );
});

module.exports = router;