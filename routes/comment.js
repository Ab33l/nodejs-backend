var express = require('express'),
    router = express.Router(),
    comment = require('../controller/comment');

// Comments Routing List
router.get('/', comment.list);
router.get('/add', comment.add);
router.post('/add', comment.save);
router.get('/delete/:id', comment.delete);
router.get('/edit/:id', comment.edit);
router.post('/edit/:id', comment.save_edit);
router.get('/view/:id', comment.view);
module.exports = router;