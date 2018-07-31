var express = require('express');
var router = express.Router();

//Require Controller Modules
var main_controller = require('../controllers/mainController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Which games do I need to catch all the Pokémon?' });
});

//GET request for existing players page.
router.get('/existing', main_controller.existing_get);

//GET request for About page
router.get('/about', main_controller.about_get);

//GET request for new players page.
router.get('/new', main_controller.new_get);

module.exports = router;
