var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    url = 'https://restaurant.michelin.fr/2abl39j/le-chiberta-paris-08';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            // We'll use the unique header class as a starting point.

            $('.poi_intro-display-title op-upper-var2__title').each(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

           // In examining the DOM we notice that the title rests within the first child element of the header tag. 
           // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                title = data.text();

           // Once we have our title, we'll store it to the our json object.

                json.title = title;
            })
        }
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    		console.log('File successfully written! - Check your project directory for the output.json file');

		})

		// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
		res.send('Check your console!')

    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;