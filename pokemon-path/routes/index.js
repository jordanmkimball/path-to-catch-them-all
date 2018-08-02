var express = require('express');
var router = express.Router();
//Require Controller Modules
var main_controller = require('../controllers/mainController');


//MAIN PAGES

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


//SEARCH PAGES

//GET request for search page
router.get('/search', main_controller.pokemon_search);

//POST request for search page
router.post('/search', main_controller.pokemon_search_post);

//GET request for list of available pokemon in Ultra Sun
router.get('/search/availability/ultrasun', main_controller.pokemon_avail_ultrasun);


//GET request for 1 pokemon by id
router.get('/search/:id', main_controller.pokemon_id_search);





module.exports = router;
