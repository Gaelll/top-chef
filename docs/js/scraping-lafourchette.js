var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var file = fs.readFileSync('restaurants-michelin.json');
var line = String(file).split(/\n/);
var count = 0;




for(var i = 0; i < line.length - 1; i++)
{
    var jsonExtract = JSON.parse(line[i]);
    var nameRestaurant = String(jsonExtract.name);
    var postalcode = String(jsonExtract.postalCode);

    var configuration = {
        'uri' : 'https://www.lafourchette.com/search-refine/' + nameRestaurant,
        'headers': {
            'cookie': 'datadome=AHrlqAAAAAMA0jF_22PoMiIALtotww=='
        }
    };


    //console.log(configuration);
    
    //console.log(url);
    request(configuration, function(error, response, html){
        if(!error){

            var $ = cheerio.load(html);
            $('.resultItem').each(function(){

                var address = $(this).find('.resultItem-address').text().trim();
                console.log("Recup adress");

                if(String(address).includes(postalcode)){
                    console.log("Enter if");
                    var link = $(this).find('.resultItem-name > a');
                    var urlEnd = link.attr("href");
                    //var newUrl = "https://www.lafourchette.com"+String(urlEnd);

                    const configuration2 = {
                        'uri' : 'https://www.lafourchette.com' + urlEnd,
                        'headers': {
                            'cookie': 'datadome=AHrlqAAAAAMA0jF_22PoMiIALtotww=='
                        }
                    };


                    request(configuration2, function(error, response, html){
                    if(!error){
                        var $ = cheerio.load(html);

                        console.log("Href recup");

                        var name, promotion;
                        var json = new Object;

                        $('.restaurantSummary-name').each(function(){


                            var data = $(this);

                            name = data.text();
                        
                            json.name = name.trim();
                        })

                        $('.saleType--specialOffer > h3').each(function(){


                            var data = $(this);

                            promotion = data.text();

                            json.promotion = promotion;
                        })

                        fs.appendFile('restaurants-lafourchette.json', JSON.stringify(json) + ",\r\n", function(err){

                console.log('File successfully written! - Check your project directory for the restaurants-lafourchette.json file');

            })
                }
            })
                }


            })

        }
        

    })
    
    
    count++;
}
console.log(count);
