var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


    
        url = 'https://www.lafourchette.com/search-refine/Les%20Mets%20de%20Mo';


        request(url, function(error, response, html){
        if(!error){

            var $ = cheerio.load(html);
            $('.resultItem-information').each(function(){

                var address = $(this).find(".resultItem-address").text();

                if(address.includes("94000")){
                    console.log("Enter if");
                    var link = $(this).find(".resultItem-name");
                    var urlEnd = link.attr("href");
                    var newUrl = "https://www.lafourchette.com"+String(urlEnd);

                    request(newUrl, function(error, response, html){
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

                        $('.saleType-title').each(function(){


                            var data = $(this);

                            promotion = data.text();

                            json.promotion = promotion;
                        })

                        fs.writeFile('restaurants-lafourchette.json', JSON.stringify(json, null, 4), function(err){

                console.log('File successfully written! - Check your project directory for the restaurants-lafourchette.json file');

            })
                }
            })
                }


            })

        }
        

    })