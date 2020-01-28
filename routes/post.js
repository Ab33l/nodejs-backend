var express = require('express'),
    router = express.Router(),
    post = require('../controller/post');

// Posts Routing List
router.get('/', post.list);
router.get('/add', post.add);
router.post('/add', post.save);
router.get('/delete/:id', post.delete);
router.get('/edit/:id', post.edit);
router.post('/edit/:id', post.save_edit);
router.get('/view/:id', post.view);
module.exports = router;
