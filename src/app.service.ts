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

  async scrapWeb() {
    let text = '';
    let imageData = '';

    if(isString(webScrabConfig.query)) {
      text = this.$(webScrabConfig.query).first().text();
    } else if(isArray(webScrabConfig.query)) {
      text = this.scrapMultiText();
    }

    if(webScrabConfig.createImage) {
      imageData = await this.imageMaker.makeTwitterImage(text);
      this.SocialNetworkService.postImageTweet(imageData, text);
    } else {
      this.SocialNetworkService.postTextTweet(text);
    }

  }

  scrapMultiText() {
    const multiText = webScrabConfig.query.map((query: string) => {
      const ele = this.$(query);
      return `${ele.first().text()} \n`;
    }).toString();

    return multiText;
  }


}
