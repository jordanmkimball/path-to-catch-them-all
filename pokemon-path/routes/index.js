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

//GET request for search2 page
router.get('/search2', main_controller.pokemon_search2);

//POST request for search2 page
router.post('/search2', main_controller.pokemon_search_post2);

//GET request for search3 page
router.get('/search3', main_controller.pokemon_search3);

//POST request for search3 page
router.post('/search3', main_controller.pokemon_search3_post);

//GET request for list of available pokemon in Ultra Sun
router.get('/search/availability/ultrasun', main_controller.pokemon_avail_ultrasun);

//GET request for list of names and Ids for all available pokemon in Ultra Moon
router.get('/search/availability/ultramoon', main_controller.pokemon_avail_ultramoon);

//GET request for SUM of all pokemon in Ultra Sun
router.get('/search/sum/Ultrasun', main_controller.search_sum_ultrasun);

//GET request for 1 pokemon by id
router.get('/search/:id', main_controller.pokemon_id_search);






module.exports = router;
