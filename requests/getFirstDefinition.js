const rp = require('request-promise');
const $ = require('cheerio');

const baseUrl = 'https://www.lexico.com/en/search?utf8=✓&filter=dictionary&dictionary=en&query=';

module.exports = async function(word) {
    const html = await rp(encodeURI(baseUrl + word));

    const exactMatch = $('.no-exact-matches', html).text() === "";
    if (!exactMatch) return {found: false};

    const result = $('.trg > p > .ind', html);

    return {
        found: true,
        definition: result.eq(0).text(),
        multiple: result.get().length > 1
    };
};
