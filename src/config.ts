export const webScrabConfig = {
    'brainyquote': {
        url: 'https://www.brainyquote.com/quote_of_the_day',
        query: ['.qotd-h-short a.b-qt', '.qotd-h-short a.bq-aut'],
        imageQuery: '.bqQt .p-qotd',
        selectionType: 'last',
        imageOptions: {
            imageBaseUrl: '',
            imageAttr: 'data-img-url',
            selectionType: 'last',
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
    },
    'quotelicious': {
        url: 'https://quotelicious.com/inspirational-quotes/',
        query: ['blockquote .quotable-text'],
        imageQuery: 'p img.aligncenter.size-full.jetpack-lazy-image',
        selectionType: 'random',
        imageOptions: {
            imageBaseUrl: '',
            imageAttr: 'src',
            selectionType: 'random',
            crop: true,
            cropOptions: {
                x: 0,
                y: 0,
                width: 696,
                height: 768
            }
        },
        limit: 280,
        tags: ["#quotes", "#quotesoftheday", "#motivation", "#motivationalquotes", "#books", "#booklovers", "#bookstagram", "#quotestoliveby", "#fitness", "#life", "#lifequotes"]
    },

}
