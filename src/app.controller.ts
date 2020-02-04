import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { SocialNetworkService } from './services/social-network.service';
import { webScrabConfig } from './config';
import { InstagramService } from './services/instagram.service';
import { FBService } from './services/fb.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly socialService: SocialNetworkService,
    private readonly instaService: InstagramService,
    private readonly fbService: FBService) {
    }

  @Get()
  async start(@Req() req: Request) {
      return await this.postTextTweet(req);
  }

  @Get('insta')
  async openInsta() {
    const insta = await this.instaService.login();
    return 'opened'
  }

  @Get('post-text-tweet')
  async postTextTweet(@Req() req: Request) {
    console.log(req);
    const text = await this.appService.scrapWeb();
    const textWithTags = this.appService.appendTags(text);
    try {
      const res: any = await this.socialService.postTextTweet(textWithTags);
      return this.appService.sendResponseFromTwitter(res);
    } catch(e) {
      console.log(e);
    }

  }

  @Get('post-image-tweet')
  async postImageTweet() {
    let text = await this.appService.scrapWeb();
    const imageData = await this.appService.getImage(text);
    text = this.appService.appendTags(text);
    const res: any = await this.socialService.postImageTweet(imageData, text);
    return this.appService.sendResponseFromTwitter(res);
  }

  @Get('post-imageonly-tweet')
  async postImageOnlyTweet() {
    const imageData = await this.appService.scrapImage();
    const res = await this.socialService.postImageTweet(imageData, this.appService.webConfig.tags.join(' '));
    return this.appService.sendResponseFromTwitter(res);
  }

  @Get('post-text-fb')
  async postTextFB() {
    const text = await this.appService.scrapWeb();
    const textWithTags = this.appService.appendTags(text)
    const res = await this.fbService.postText(textWithTags);
    console.log(res);
    return 'posted in fb'
  }

}
