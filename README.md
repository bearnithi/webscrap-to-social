## Description

<p>
 A simple NestJS tool to scrap text and image from any website and post that content in your twitter account.
</p>


## Installation

```bash
$ npm install
```

## Configuration

### Configure Twitter Account

  Create a `.env` file in your root directory, and add the following variables (without <> sympols and quotes). You can get these keys by creating a developer account in twitter.

```bash
TWITTER_CONSUMER_KEY=<YOUR_TWITTER_CONSUMER_KEY>
TWITTER_CONSUMER_SECRET=<YOUR_TWITTER_CONSUMER_SECRET>
TWITTER_ACCESS_TOKEN=<YOUR_TWITTER_ACCESS_TOKEN>
TWITTER_ACCESS_TOKEN_SECRET=<YOUR_TWITTER_ACCESS_TOKEN_SECRET>
```

### Web Scrap Configuration
In the `src/config.ts`, change the `webScrapInfo` object with your targeting website.

|   Properties | Values   | Type | Description |
| ------------ | ------------ | -------- | --------- |
| url  | 'http://samplewebsite.com' | string | Website url to scrap the data
|  query | ['.container p', 'main .headline']  | Array | List of query to search the DOM.
| imageQuery | '.container img' | string | Query to scrap the image.
| imageOptions | {imageBaseUrl etc.. } | object | several image options like cropping etc. More info in the below table
| limit | 280 | number | Text limit of the post. especially for twitter.
| tags | ['#motivation','#success'] | Array | Tags to append in the post

#### Image Options

In the `imageOptions` object, there are several properties to modify.

|   Properties | Values   | Type | Description |
| ------------ | ------------ | -------- | --------- |
| imageBaseUrl | 'http://samplewebsite.com/photos' | string | Base url for the image scraping.
| imageAttr | 'src' | string | Attribute of the image element. by default it's src, if you want to select anyother attribute you can change this property.
| crop | true | boolean | To enable crop functionality.
| cropOptions | { x: 0, y: 0, width: 1200, height: 580 } | object | Crop Options. 

#### Sample Web Config

```typescript
export const webScrabConfig = {
    url: 'https://www.sample.com/some-page',
    query: ['.qotd-h-short a.b-qt', '.qotd-h-short a.bq-aut'],
    imageQuery: '.Qt .p-qotd',
    imageOptions: {
        imageBaseUrl: 'https://www.sample.com',
        imageAttr: 'src',
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

````

## API ENDPOINTS TO SCRAP AND TWEET

### 1. /post-text-tweet
This end point will scrap the text using the config you provided (website url and query array) and post the text content in your twitter account.

### 2. /post-imageonly-tweet
It's used to scrap the image from the website (imageBaseUrl and imageQuery) and post it in your twitter account.

### 3. /post-image-tweet
It'll post both the text and image which is created on the fly with sample backgrounds and scraped text. (This Endpoint won't scrap the image from website, instead it create a image with a sample background in `assets/images/samples` folder and scraped text on it).


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

