var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


    for(var i = 1; i < 36; i++){
        url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+ String(i) ;


        request(url, function(error, response, html){
        if(!error){

            var $ = cheerio.load(html);
            $('.poi-card-link').each(function(){

                var link = $(this);

                var urlEnd = link.attr("href");

                var newUrl = "https://restaurant.michelin.fr"+String(urlEnd);

                request(newUrl, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);

                    var name, address, locality, postalCode;
                    var json = new Object;

                    $('.poi_intro-display-title').each(function(){


                        var data = $(this);

                        name = data.text();
                        
                        json.name = name.trim();
                    })

                    $('.thoroughfare').each(function(){


                        var data = $(this);

                        address = data.text();

                        json.address = address;
                    })

                    $('.postal-code').each(function(){


                        var data = $(this);

                        postalCode = data.text();

                        json.postalCode = postalCode;
                    })

                    $('.locality').each(function(){


                        var data = $(this);

                        locality = data.text();

                        json.locality = locality;
                    })
                    fs.appendFile('restaurants-michelin.json', JSON.stringify(json) + "\r\n", function(err){

            console.log('File successfully written! - Check your project directory for the restaurants-michelin.json file');

        })
                }
            })

            })

        }
        

    })
    }