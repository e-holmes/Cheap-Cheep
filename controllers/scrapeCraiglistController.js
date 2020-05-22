var cheerio = require("cheerio");
const puppeteer = require('puppeteer');

module.exports = {
    scraperCraiglist: function (req, res) {

        //Set up the URL to search on walmart by adding the search term. Puppeteer is smart and will understand spaces.
        var url = "https://seattle.craigslist.org/search/sss?query=" + req.params.searchTerm + "&sort=rel";
        var firstMatch = {};


        function handlePage(page){


            var $ = cheerio.load(page);
            var productNames = [];
            var productPrices = [];
            var productLinks = [];
            var imageLinks = [];

            $(".result-title").each(function (i, element) {
                Link = $(element).attr("href");
                Name = $(element).text();

                productLinks.push(Link);
                productNames.push(Name);
            })
            $(".result-price").each(function (i, element) {
                Prices = $(element).text();

                productPrices.push(Prices);

            })
            $(".swipe-wrap img").each(function (i, element) {

                Image = $(element).attr("src")
                imageLinks.push(Image)

            })


            firstMatch.name = productNames[0];
            firstMatch.price = productPrices[0];
            firstMatch.link = productLinks[0];
            firstMatch.image = imageLinks[0];

            res.json(firstMatch);
        }


         (async () => {
            const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

            try {
                const page = await browser.newPage();
                await page.goto(url);
                const content = await page.content();

                handlePage(content);
                
            } catch (error) {
               console.log(error);
            } finally {
                browser.close().catch( function(error) {
                    console.log(error);
                });
            }

        })();

    }
};

