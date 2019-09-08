const rp = require('request-promise');
const $ = require('cheerio');

rp(encodeURI('https://www.lexico.com/en/search?utf8=✓&filter=dictionary&dictionary=en&query=meme')).then((html) => {
    console.log($('.trg > p > span.ind', html).text());
});
