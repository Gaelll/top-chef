# TOP CHEF


## Installation

Go to the first folder (top-chef) and type the following code to install the modules

```
npm install
```

## Michelin scraping

To get all the stared restaurants in Michelin, go to the folder js then execute the file.js

```
cd /path/to/workspace/top-chef/docs/js
node scraping-michelin.js
```

Now we have all the restaurants are saved in the json file restaurants-michelin.json (in the same folder).

## La Fourchette scraping

To get all the deals from La Fourchette, go to the folder js then execute the file.js

```
cd /path/to/workspace/top-chef/docs/js
node scraping-lafourchette.js
```
It should gives you all the deals in the json file restaurants-lafourchette.json (in the same folder).
But I had some issues with this scraping.


## Issues and details

The main problem I had was the scraping of the website La Fourchette. I couldn't get the list of deals with La Fourchette.
I can read my json file restaurants-michelin.json to have the link to browse to search the restaurant on La Fourchette but I can't enter my if condition.
So I tried to scrape La Fourchette with one restaurant. In the folder path/to/workspace/top-chef/docs/js, the file test.js is a test file for the scraping of one restaurant on La Fourchette. And the result is saved in restaurants-lafourchette-test.json

I started the client-side with react and succeeded in displaying the list of restaurants with the file test-react.json (which is the list of restaurants from Michelin slightly modified). The folder to find the react part is path/to/workspace/top-chef/docs/my-app/src.