export const webScrabConfig = {
    url: 'https://www.brainyquote.com/quote_of_the_day',
    imageBaseUrl: 'https://www.brainyquote.com',
    query: ['.qotd-h-short a.b-qt', '.qotd-h-short a.bq-aut'],
    imageQuery: '.bqQt .p-qotd',
    imageAttr: 'data-img-url',
    createImage: true,
    limit: 280,
    tags: ["#quotes", "#quotesoftheday", "#motivation", "#motivationalquotes", "#books", "#booklovers", "#bookstagram", "#quotestoliveby", "#fitness", "#life", "#lifequotes"]
}
