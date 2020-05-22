//This script was just used for testing scraper functionality.
//The actually scraping happens in the controllers.

var cheerio = require("cheerio");
const puppeteer = require('puppeteer');

//This isn't actually working right at the moment; this should just be an API route so the promise returns correctly. Just leaving this in as it is for posterity.

function scrapeWalmart(searchTerm){

    //Set up the URL to search on walmart by adding the search term. Puppeteer is smart and will understand spaces.
    var url = "https://www.walmart.com/search/?query=" + searchTerm;
    var firstMatch = {};

    //Launch puppeteer
    puppeteer.launch().then(function (browser) {
        return browser.newPage();
    })
        .then(function (page) {
            return page.goto(url).then(function () {
                return page.content();
            })
        })
        .then(function (html) {
            var $ = cheerio.load(html);
            var productNames = [];
            var productPrices = [];
            var productLinks = [];
    
            $(".price-main").each(function (i, element) {
                var price = $(element).children().first().text();
    
    
                // push each price into the productPrices array
                productPrices.push(price);
            });
    
            $(".product-title-link").each(function (i, element) {
                var link = "walmart.com"
                link += $(element).attr("href");;

                var name = $(element).children().first().next().text();

                if (name === ''){
                    name = $(element).children().first().text();
                }
    
                // push each link into the productLinks array
                productLinks.push(link);
                productNames.push(name);
            });
    
             
            firstMatch.name = productNames[0];
            firstMatch.price = productPrices[0];
            firstMatch.link = productLinks[0];
        })
        .then(function () {
            console.log(firstMatch);    
            return firstMatch
        })
        
    }
exports.scrapeWalmart = scrapeWalmart;