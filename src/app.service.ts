import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { SocialNetworkService } from './services/social-network.service';
import { text } from 'body-parser';
import { isString, isArray } from 'util';
import { ImageMakerService } from './services/image-maker.service';

@Injectable()
export class AppService {
  $: CheerioStatic;
  imageData: any;
  webConfig: any = {};

  constructor(private readonly SocialNetworkService: SocialNetworkService, 
    private readonly imageMaker: ImageMakerService) {
  }

  async initWebScrap() {
    const result = await axios.get(this.webConfig.url);
    this.$ = await cheerio.load(result.data);
  }

  async scrapWeb(): Promise<string> {
    if(!this.$) {
      await this.initWebScrap();
    }
    let text = '';

    if(isString(this.webConfig.query)) {
      text = this.$(this.webConfig.query).first().text();
    } else if(isArray(this.webConfig.query)) {
      text = this.scrapMultiText();
    }
    text = this.truncateTweetByLimit(text);

    return text;
  }

  async scrapImage(): Promise<string> {
    const { imageOptions } = this.webConfig;
    let imageUrl = (imageOptions.imageBaseUrl || '') + this.$(this.webConfig.imageQuery).first().attr(imageOptions.imageAttr || 'src');
    console.log(imageUrl);
    const imageData = await this.imageMaker.readImageAndMakeBase64(imageUrl, imageOptions.crop, imageOptions.cropOptions)
    return imageData;
  }

  async getImage(text: string): Promise<string> {
    return await this.imageMaker.makeImageWithBg(text);
  }

  appendTags(tweet: string): string {
    if(isArray(this.webConfig.tags)) {
      tweet += `\n ${this.webConfig.tags.join(' ')}`
    }
    return tweet;
  }

  truncateTweetByLimit(tweet: string): string {
    if(tweet.length === this.webConfig.limit) {
      return tweet;
    }

    if(tweet.length > this.webConfig.limit) {
     tweet = tweet.substring(0, this.webConfig.limit);
    }

    return tweet;
  }

  scrapMultiText(): string {
    const multiText = this.webConfig.query.map((query: string) => {
      const ele = this.$(query);
      return `${ele.first().text()} \n`;
    }).toString();

    return multiText;
  }

  sendResponseFromTwitter(res) {
    if(res.resp.statusCode === 200) {
      return 'Tweet posted successfully!'
    } else {
      return 'Something went wrong while posting the tweet!'
    }
  }


}
