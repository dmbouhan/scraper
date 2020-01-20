var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
 
  return axios.get("https://www.mlssoccer.com/news").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");
    
    var articles = [];
    
    $("div.node-title").each(function(i, element) {
      
      var head = $(this)
        .children("a")
        .text()
        .trim();

      var url = $(this)
        .children("a")
        .attr("href");

      if (head && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array
        var dataToAdd = {
          headline: headNeat,
          url: "https://www.mlssoccer.com/news" + url
        };

        // Push new article into articles array
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};


module.exports = scrape;