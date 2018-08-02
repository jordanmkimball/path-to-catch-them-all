var express = require('express');
var app = express();

//Code to enable body-parser to be used 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//Code to use async
var async = require('async');

//WHERE I will put requirements linked to the Sqlite3 database probably
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('pokemon.db');



//START OF GET REQUEST FUNCTIONS


//Display Existing Players Page on GET
exports.existing_get = function (req, res){
    res.send('NOT IMPLIMENTED: existing_get page should be here');
};

//Display About Page
exports.about_get = function (req, res){
    res.send('NOT IMPLIMENTED: about_get page should be here');
};

//Display New Players Page
exports.new_get = function (req, res){
    res.send('NOT IMPLIMENTED: new_get should be here');
};

//START OF POKEMON SEARCH FUNCTIONS

//Display the Pokemon search page
exports.pokemon_search = function (req, res, next){
    res.render('pokemon_search', {title: 'Find availability by game'});
};

//Handle Pokemon Search page POST request
exports.pokemon_search_post = function (req, res, next){
    var ultraSunBox = document.querySelector('ultraSunBox');
        if (ultraSunBox.checked == true)  {
            console.log("Return list of Pokemon available in Ultra Sun");
            db.all('SELECT Name FROM AvPokemon WHERE USun IN ("C","E","B","R","S")', function (err,rows) {
                if (err) {res.send(err.message);}
                //No error so render.
                else{
                    var Names = [];
                    for (var i=0; i<rows.length; i++){
                        Names.push(rows[i].Name);
                    }
                    res.render('avail_usun', {title: 'Pokémon Available in Ultra Sun', names: Names});
                }
            });
        };
        //Box not checked:
        console.log("Return list of all Pokemon");
        db.all('SELECT Name FROM AvPokemon', function (err, rows){ 
            if (err) {res.send(err.message);}
            //No error so render.
            else{
                var Names = [];
                for (var i=0; i<rows.length; i++){
                    Names.push(rows[i].Name);
                }
                res.render('avail_usun', {title: 'List of All Pokémon', names: Names});
            }
        });
};

//Display list of available pokemon in Ultra Sun
exports.pokemon_avail_ultrasun = function (req, res, next){
    console.log("Return list of Pokemon available in Ultra Sun");
    db.all('SELECT Name FROM AvPokemon WHERE USun IN ("C","E","B","R","S")', function (err,rows) {
        if (err) {res.send(err.message);}
        //No error so render.
        else{
            var Names = [];
            for (var i=0; i<rows.length; i++){
                Names.push(rows[i].Name);
            }
            res.render('avail_usun', {title: 'Pokémon Available in Ultra Sun', names: Names});
        }
    });
};


//Display information about a single pokemon by id
exports.pokemon_id_search = function (req, res, next){
    console.log("Return pokemon with Id: " + req.params.id);
    db.get('SELECT Id, Name, USun, UMoon FROM AvPokemon WHERE id = ?', [req.params.id], function (err, row) {
        if (err) { res.send(err.message); }
        //No error so render. 
        else{
            var pokedexNumber = 'Pokédex Number: ' + row.Id;
            var pokemonName = 'Pokémon Name: ' + row.Name;
            var ultraSun = 'Ultra Sun Availability: ' + row.USun;
            var ultraMoon = 'Ultra Moon Availability: ' + row.UMoon;
            res.render('pokemon_id_search', {title: 'Pokémon Availability Details', pokemon_id: pokedexNumber, pokemon_name: pokemonName, ultra_sun: ultraSun, ultra_moon: ultraMoon});
        }
    });
};