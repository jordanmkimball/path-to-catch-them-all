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

//Handle pokemon search POST to show either list of all pokemon, or pokemon in Ultra Sun
exports.pokemon_search_post = function (req, res, next){
    console.log(req.body.ultra_sun)
        if (req.body.ultra_sun == 'ultra_sun'){
            var sqlQuery = 'SELECT Name FROM AvPokemon WHERE USun IN ("C","E","B","R","S")';
            }
        else {
            var sqlQuery = 'SELECT Name FROM AvPokemon';
        }
    db.all(sqlQuery, function (err,rows) {
        if (err) {res.send(err.message);}
        //No error so render
        else{
            var Names = [];
            for (var i=0; i<rows.length; i++){
                Names.push(rows[i].Name);
            }
            res.render('avail_usun', {title: 'Pokémon List', names: Names});
        }
    })
};

//Display the pokemon search2 page on GET
exports.pokemon_search2 = function (req, res, next){
    res.render('pokemon_search2', {title: 'Which Pokémon are you missing?'});
};


//Display missing pokemon on search2 POST
exports.pokemon_search_post2 = function (req, res, next){
    //Seeing whether the user checked the Ultra Sun or X boxes
    console.log(req.body.ultra_sun);
    console.log(req.body.x);
    //Game count necessary in case user didn't select any boxes
    var gameCount = 0;
    if (req.body.ultra_sun == 'ultra_sun') {
        var ultraSun = ' AND USun NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var ultraSun = '';
    }
    if (req.body.x == 'x') {
        var x = ' AND X NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var x = '';
    }
    //Case where user didn't select any of the options. Return full list of Pokemon
    if (gameCount == 0) {
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon';
    }
    else{
        var whereStatement = ultraSun + x
        //Need to delete the extra ' AND' so SQL doesn't freak out
        var newWhereStatement = whereStatement.replace(' AND', '');
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon WHERE ' + newWhereStatement;
    }
    console.log(sqlQuery);
    //Now to actually pull the information from the database. 
    db.all(sqlQuery, function (err,rows) {
        if (err) {res.send(err.message);}
        //No error so render
        var Ids = [];
        for (var i=0; i<rows.length; i++){
            Ids.push(rows[i].Id);
        }
        var Names = [];
        for (var i=0; i<rows.length; i++){
            Names.push(rows[i].Name);
        }
        var Pokemon = {};
        Ids.forEach((Id, i) => Pokemon[Id] = Names[i]);
        res.render('missing_pokemon', {title: 'Pokémon you are not able to catch in game based on your current games', pokemon: Pokemon});
    })
};


//Display pokemon_search3 page on GET
exports.pokemon_search3 = function (req, res, next){
    res.render('pokemon_search3', {title: 'Which Pokémon are you missing?'});
};
 

//Display missing pokemon for pokemon_search3 on POST
exports.pokemon_search3_post = function (req, res, next){
    //Game count necessary in case user didn't select any boxes
    var gameCount = 0;
    //Seeing whether the user checked the Ultra Sun Box
    if (req.body.ultra_sun == 'ultra_sun') {
        var ultraSun = ' AND USun NOT IN ("C","E","B","R","S")';
        //ultraSun2 is the variable that will determine if the game shows up in the game recommendations
        var ultraSunBox = 'checked';
        gameCount+= 1;
    }
    else{
        var ultraSun = '';
        //A value of unchecked will mean that the box isn't checked and therefor it is ok for Ultra Sun to show up as game recommendation
        var ultraSunBox = 'unchecked';
    }
    if (req.body.ultra_moon == 'ultra_moon') {
        var ultraMoon = ' AND UMoon NOT IN ("C","E","B","R","S")';
        var ultraMoonBox = 'checked';
        gameCount+= 1;
    }
    else{
        var ultraMoon = '';
        var ultraMoonBox = 'unchecked';
    }
    if (req.body.sun == 'sun') {
        var sun = ' AND Sun NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var sun = '';
    }
    if (req.body.moon == 'moon') {
        var moon = ' AND Moon NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var moon = '';
    }
    if (req.body.omega_ruby == 'omega_ruby') {
        var omegaRuby = ' AND OmegaR NOT IN ("C","E","B","R","S")';
        var omegaRubyBox = 'checked';
        gameCount+= 1;
    }
    else{
        var omegaRuby = '';
        var omegaRubyBox = 'unchecked';
    }
    if (req.body.alpha_sapphire == 'alpha_sapphire') {
        var alphaSapphire = ' AND AlphaS NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
        var alphaSapphireBox = 'checked';
    }
    else{
        var alphaSapphire = '';
        var alphaSapphireBox = 'unchecked';
    }
    if (req.body.friend_safari == 'friend_safari') {
        var friendSafari = ' AND FSafari NOT IN ("C", "E", "B")';
        gameCount+= 1;
    }
    else{
        var friendSafari = '';
    }
    if (req.body.x == 'x') {
        var x = ' AND X NOT IN ("C","E","B","R","S")';
        var xBox = 'checked';
        gameCount+= 1;
    }
    else{
        var x = '';
        var xBox = 'unchecked';
    }
    if (req.body.y == 'y') {
        var y = ' AND Y NOT IN ("C","E","B","R","S")';
        var yBox = 'checked';
        gameCount+= 1;
    }
    else{
        var y = '';
        var yBox = 'unchecked';
    }
    //Check to see if we include Pokemon from the dream_radar in calculation
    if (req.body.dream_radar == 'dream_radar' && req.body.white_2 == 'white_2') {
        if (req.body.black_2 == 'black_2') {
            var black2 = ' AND Black2 NOT IN ("C","E","B","R","S","DR","DRE")';
            gameCount+= 1;
        }
        else{
            var black2 = '';
        }
        if (req.body.white_2 == 'white_2') {
            var white2 = ' AND White2 NOT IN ("C","E","B","R","S","DR","DRE")';
            gameCount+= 1;
        }
        else{
            var white2 = '';
        }
    }
    //No Dream Radar in Calculation
    else {
        if (req.body.black_2 == 'black_2') {
            var black2 = ' AND Black2 NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var black2 = '';
        }
        if (req.body.white_2 == 'white_2') {
            var white2 = ' AND White2 NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var white2 = '';
        }
    }
    //End of Dream Radar affected games
    if (req.body.black == 'black') {
        var black = ' AND Black NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var black = '';
    }
    if (req.body.white == 'white') {
        var white = ' AND White NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var white = '';
    }
    if (req.body.pokewalker == 'pokewalker') {
        var pokewalker = ' AND Pokewalker NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var pokewalker = '';
    }
    if (req.body.heartgold == 'heartgold') {
        var heartGold = ' AND HeartGold NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var heartGold = '';
    }
    if (req.body.soulsilver == 'soulsilver') {
        var soulSilver = ' AND SoulSilver NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var soulSilver = '';
    }
    //Checking if the dual_slot box was checked. If so include Pokemon that can be caught in dual slot mode in Diamond, Pearl, and Platinum
    if (req.body.dual_slot = 'dual_slot') {
        if (req.body.diamond == 'diamond') {
            var diamond = ' AND Diamond NOT IN ("C","E","B","R","S","D")';
            gameCount+= 1;
        }
        else{
            var diamond = '';
        }
        if (req.body.pearl == 'pearl') {
            var pearl = ' AND Pearl NOT IN ("C","E","B","R","S","D")';
            gameCount+= 1;
        }
        else{
            var pearl = '';
        }
        if (req.body.platinum == 'platinum') {
            var platinum = ' AND Platinum NOT IN ("C","E","B","R","S","D")';
            gameCount+= 1;
        }
        else{
            var platinum = '';
        }
    }
    //Dual slot box not checked
    else{
        if (req.body.diamond == 'diamond') {
            var diamond = ' AND Diamond NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var diamond = '';
        }
        if (req.body.pearl == 'pearl') {
            var pearl = ' AND Pearl NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var pearl = '';
        }
        if (req.body.platinum == 'platinum') {
            var platinum = ' AND Platinum NOT IN ("C","E","B","R","S")';
            gameCount+= 1;
        }
        else{
            var platinum = '';
        }
    }
    //end of dual slot affected games
    if (req.body.firered == 'firered') {
        var fireRed = ' AND FireRed NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var fireRed = '';
    }
    if (req.body.leafgreen == 'leafgreen') {
        var leafGreen = ' AND leafGreen NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var leafGreen = '';
    }
    if (req.body.ruby == 'ruby') {
        var ruby = ' AND Ruby NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var ruby = '';
    }
    if (req.body.sapphire == 'sapphire') {
        var sapphire = ' AND Sapphire NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var sapphire = '';
    }
    if (req.body.emerald == 'emerald') {
        var emerald = ' AND Emerald NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var emerald = '';
    }
    if (req.body.gold == 'gold') {
        var gold = ' AND Gold NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var gold = '';
    }
    if (req.body.silver == 'silver') {
        var silver = ' AND Silver NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var silver = '';
    }
    if (req.body.crystal_3DS == 'crystal_3DS') {
        var crystal3DS = ' AND Crystal3DS NOT IN ("C","E","B","R","S")';
        var crystal3DSBox = 'checked';
        gameCount+= 1;
    }
    else{
        var crystal3DS = '';
        var crystal3DSBox = 'unchecked';
    }
    if (req.body.crystal == 'crystal') {
        var crystal = ' AND Crystal NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var crystal = '';
    }
    if (req.body.red == 'red') {
        var red = ' AND Red NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var red = '';
    }
    if (req.body.blue == 'blue') {
        var blue = ' AND EngBlue NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var blue = '';
    }
    if (req.body.yellow == 'yellow') {
        var yellow = ' AND Yellow NOT IN ("C","E","B","R","S")';
        gameCount+= 1;
    }
    else{
        var yellow = '';
    }
    //Creating some variables to make the recommendation query easier
    var sumWhen = ' SUM(CASE WHEN ';
    var inAs = ' IN ("C","E","B","R","S") THEN 1 ELSE 0 END) AS ';
    //Case where user didn't check any of the boxes. Return full list of Pokemon
    if (gameCount == 0) {
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon';
        var sqlCountQuery = 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon';
        //Attempting to make the SQL Recommendation Query
        var sqlRecQuery = 'SELECT ' + sumWhen + 'USun' + inAs + 'USunR,' + sumWhen + 'UMoon' + inAs + 'UMoonR,' + sumWhen + 'OmegaR' + inAs + 'OmegaRR,' + sumWhen + 'AlphaS' + inAs + 'AlphaSR,' + sumWhen + 'X' + inAs + 'XR,' + sumWhen + 'Y' + inAs + 'YR,' +  sumWhen + 'Crystal3DS' + inAs + 'Crystal3DSR ' + 'FROM AvPokemon'; 
    }
    else{
        var whereStatement = ultraSun + ultraMoon + sun + moon + omegaRuby + alphaSapphire + friendSafari + x + y + black2 + white2 + black + white + pokewalker + heartGold + soulSilver + diamond + pearl + platinum + fireRed + leafGreen + ruby + sapphire + emerald + gold + silver + crystal3DS + crystal + red + blue + yellow
        //Need to delete the extra ' AND' so SQL doesn't freak out
        var newWhereStatement = whereStatement.replace(' AND', '');
        //Excluding the event only Pokemon
        var sqlQuery = 'SELECT Id, Name FROM AvPokemon WHERE ' + newWhereStatement + ' AND Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802, 807)';
        //Including query to count the number of missing Pokemon
        var sqlCountQuery = 'SELECT COUNT(Id) AS Pokemon_Count FROM AvPokemon WHERE ' + newWhereStatement + ' AND Id NOT IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 801, 802, 807)';
        var sqlRecQuery = 'SELECT ' + sumWhen + 'USun' + inAs + 'USunR,' + sumWhen + 'UMoon' + inAs + 'UMoonR,' + sumWhen + 'OmegaR' + inAs + 'OmegaRR,' + sumWhen + 'AlphaS' + inAs + 'AlphaSR,' + sumWhen + 'X' + inAs + 'XR,' + sumWhen + 'Y' + inAs + 'YR,' +  sumWhen + 'Crystal3DS' + inAs + 'Crystal3DSR ' + 'FROM AvPokemon WHERE ' + newWhereStatement;
        var sqlEventQuery = 'SELECT Id, Name FROM AvPokemon WHERE Id IN (151, 385, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720, 721, 802, 807)'
    }
    console.log(sqlQuery);
    console.log(sqlCountQuery);
    console.log(sqlRecQuery);
    //Now to actually pull the information from the database. 
    db.all(sqlQuery, function (err,rows) {
        if (err) {res.send(err.message);}
        //No error so proceed
        var Ids = [];
        for (var i=0; i<rows.length; i++){
            Ids.push(rows[i].Id);
        }
        var Names = [];
        for (var i=0; i<rows.length; i++){
            Names.push(rows[i].Name);
        }
        var Pokemon = {};
        Ids.forEach((Id, i) => Pokemon[Id] = Names[i]);
        //2nd SQL Query for the Count of the missing pokemon
        db.get(sqlCountQuery, function (err, row){
            if (err) {res.send(err.message);}
            //No error so proceed
            var pokemonCount = row.Pokemon_Count;
            db.get(sqlRecQuery, function (err, row){
                if (err) {res.send(err.message);}
                //No error so render
                if (ultraSunBox == 'unchecked') {var ultraSunRec = row.USunR}
                else {var ultraSunRec = 'no'}
                if (ultraMoonBox == 'unchecked') {var ultraMoonRec = row.UMoonR}
                else {var ultraMoonRec = 'no'}
                if (omegaRubyBox == 'unchecked') {var omegaRubyRec = row.OmegaRR}
                else {var omegaRubyRec = 'no'}
                if (alphaSapphireBox == 'unchecked') {var alphaSapphireRec = row.AlphaSR}
                else {var alphaSapphireRec = 'no'}
                if (xBox == 'unchecked') {var xRec = row.XR}
                else {xRec = 'no'}
                if (yBox == 'unchecked') {var yRec = row.YR}
                else {yRec = 'no'}
                if (crystal3DSBox == 'unchecked') {var crystal3DSRec = row.Crystal3DSR}
                else {crystal3DSRec = 'no'}
                //SQL Query for the event only Pokemon
                db.all(sqlEventQuery, function (err, rows){
                    //No error so proceed
                    var EventIds = [];
                    for (var i=0; i<rows.length; i++){
                        EventIds.push(rows[i].Id);
                    }
                    var EventNames = [];
                    for (var i=0; i<rows.length; i++){
                        EventNames.push(rows[i].Name);
                    }
                    var EventPokemon = {};
                    EventIds.forEach((Id, i) => EventPokemon[Id] = EventNames[i]);
                    res.render('missing_pokemon2', {title: "Your Path to Catch'em All", pokemon: Pokemon, pokemon_count: pokemonCount, ultra_sun_rec: ultraSunRec, ultra_moon_rec: ultraMoonRec, omega_ruby_rec: omegaRubyRec, alpha_sapphire_rec: alphaSapphireRec, x_rec: xRec, y_rec: yRec, crystal_3ds_rec: crystal3DSRec, event_pokemon: EventPokemon});
                })
            })
        });
    })
};





//Display Sum of all obtainable Pokemon in Ultra Sun
exports.search_sum_ultrasun = function (req, res, next){
    db.get('SELECT SUM(CASE WHEN USun IN ("C","E","B","R","S") THEN 1 ELSE 0 END) AS UltraSum FROM AvPokemon', function (err,row){
        if (err) {res.send(err.message);}
        //No error so render
        var ultraSunSum = 'The Number of Pokémon currently obtainable in Ultra Sun: ' + row.UltraSum;
        res.render('ultra_sun_sum', {title: 'Ultra Sun Sum of Pokémon', ultra_sum: ultraSunSum});
    });
}

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

//Display list of Id's and names of all available pokemon in Ultra Moon
exports.pokemon_avail_ultramoon = function (req, res, next){
    console.log("Return list of Ids and Pokemon Names of Available Pokemon in Ultra Moon");
    db.all('SELECT Id, Name FROM AvPokemon WHERE UMoon IN ("C","E","B","R","S")', function (err, rows){
        if (err) {res.send(err.message);}
        //No error so render
        var Ids = [];
        for (var i=0; i<rows.length; i++){
            Ids.push(rows[i].Id);
        }
        var Names = [];
        for (var i=0; i<rows.length; i++){
            Names.push(rows[i].Name);
        }
        var Pokemon = {};
        Ids.forEach((Id, i) => Pokemon[Id] = Names[i]);
        res.render('avail_umoon', {title: 'Pokémon Available in Ultra Moon', pokemon: Pokemon});
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