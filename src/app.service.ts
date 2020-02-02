import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { webScrabConfig } from './config';
import { SocialNetworkService } from './services/social-network.service';
import { text } from 'body-parser';
import { isString, isArray } from 'util';
import { ImageMakerService } from './services/image-maker.service';

@Injectable()
export class AppService {
  $: CheerioStatic;
  imageData: any;
  constructor(private readonly SocialNetworkService: SocialNetworkService, 
    private readonly imageMaker: ImageMakerService) {
    this.initWebScrap();
  }

  async initWebScrap() {
    const result = await axios.get(webScrabConfig.url);
    this.$ = cheerio.load(result.data);
  }

  scrapWeb(): string {
    let text = '';

    if(isString(webScrabConfig.query)) {
      text = this.$(webScrabConfig.query).first().text();
    } else if(isArray(webScrabConfig.query)) {
      text = this.scrapMultiText();
    }
    text = this.truncateTweetByLimit(text);

    return text;
  }

  async scrapImage(): Promise<string> {
    let imageBaseUrl = webScrabConfig.imageBaseUrl || '';
    let imageUrl = imageBaseUrl + this.$(webScrabConfig.imageQuery).first().attr(webScrabConfig.imageAttr || 'src');
    const imageData = await this.imageMaker.readImageAndMakeBase64(imageUrl)
    return imageData;
    
  }

  async getImage(text: string): Promise<string> {
    if(webScrabConfig.createImage) {
      return await this.imageMaker.makeImageWithBg(text);
    }

    return 'Your config file do not have createImage flag as true';
  }

  appendTags(tweet: string): string {
    if(isArray(webScrabConfig.tags)) {
      tweet += `\n ${webScrabConfig.tags.join(' ')}`
    }
    return tweet;
  }

  truncateTweetByLimit(tweet: string): string {
    if(tweet.length === webScrabConfig.limit) {
      return tweet;
    }

    if(tweet.length > webScrabConfig.limit) {
     tweet = tweet.substring(0, webScrabConfig.limit);
    }

    return tweet;
  }

  scrapMultiText(): string {
    const multiText = webScrabConfig.query.map((query: string) => {
      const ele = this.$(query);
      return `${ele.first().text()} \n`;
    }).toString();

    return multiText;
  }


}
