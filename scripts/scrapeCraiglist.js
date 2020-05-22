//This script was just used for testing scraper functionality.
//The actually scraping happens in the controllers.

var cheerio = require("cheerio");
var axios = require("axios");

function scrapeCraiglist(searchTerm) {
  var firstMatch = {};

  var url = "https://seattle.craigslist.org/search/sss?query=" + searchTerm + "&sort=rel";

  axios.get(url).then(function (response) {
    console.log(response.data);
    var $ = cheerio.load(response.data);
    var productNames = [];
    var productPrices = [];
    var productLinks = [];
  

    $(".result-title").each(function (i, element) {
      Link = $(element).attr("href");
      Name= $(element).text();
      // console.log(Link)
      // console.log(Name)
      productLinks.push(Link);
      productNames.push(Name);
    })
    $(".result-price").each(function (i, element) {
      Prices = $(element).text();
      //console.log(productPrices)
      productPrices.push(Prices);

    })
      
 
    //console.log(image);
    firstMatch.name = productNames[0];
    firstMatch.price = productPrices[0];
    firstMatch.link = productLinks[0];


  })
  .then(function () {
    console.log(firstMatch);    
    return firstMatch
  })
}


