const express = require('express');
const router = express.Router();

// Express Validator middleware
const { check, validationResult } = require('express-validator');

//bring article models
let { Note } = require('../models/note');

//bring user models
let { User } = require('../models/user');

//add route 
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('add_note', {
        title: 'Add Notes'
    });
});

//add submit POST route
router.post('/add', [check('title', 'title is empty').notEmpty(),
// check('author', 'author is empty').notEmpty(),
check('body', 'body is empty').notEmpty()],
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array();
            res.render('add_note', {
                title: 'Add Note',
                err
            });
        } else {
            var note = new Note();
            note.title = req.body.title;
            // console.log(req.user);
            // article.author = req.user.username;
            note.author = req.user.id;
            note.body = req.body.body;
            note.date = new Date();
            note.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Note added');
                    res.redirect('/home');
                }
            });
        }
    });


// load edit form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
        res.render('edit_note', {
            title: "edit note",
            note: note
        });
    })
})

//update submit POST route
router.post('/edit/:id', (req, res) => {
    var note = {};
    note.title = req.body.title;
    note.author = req.body.author;
    note.body = req.body.body;
    note.date = new Date();
    var query = { _id: req.params.id };
    Note.updateOne(query, note, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'note updated');
            res.redirect('/home');
        }
    });
});

//delete
router.delete('/delete/:id', (req, res) => {
    Note.findById(req.params.id).deleteOne((err) => {
        if (err) {
            console.log(err);
        } else {
            req.flash('success', 'note deleted');
            res.redirect('/home');
        }
    });
})

// get single article
router.get('/:id', (req, res) => {
    Note.findById(req.params.id, (err, note) => {
        User.findById(note.author, (err, user) => {
            res.render('home', {
                note: note,
                author: user.name
            });
        });
    })
})

//access control 
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/');
    }
}
module.exports = router;