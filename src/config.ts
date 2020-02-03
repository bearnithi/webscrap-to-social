export const webScrabConfig = {
    url: 'https://www.brainyquote.com/quote_of_the_day',
    query: ['.qotd-h-short a.b-qt', '.qotd-h-short a.bq-aut'],
    imageQuery: '.bqQt .p-qotd',
    imageOptions: {
        imageBaseUrl: 'https://www.brainyquote.com',
        imageAttr: 'data-img-url',
        crop: true,
        cropOptions: {
            x: 0,
            y: 0,
            width: 1200,
            height: 560
        }
    },
    limit: 280,
    tags: ["#quotes", "#quotesoftheday", "#motivation", "#motivationalquotes", "#books", "#booklovers", "#bookstagram", "#quotestoliveby", "#fitness", "#life", "#lifequotes"]
}
