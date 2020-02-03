import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SocialNetworkService } from './services/social-network.service';
import { webScrabConfig } from './config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly socialService: SocialNetworkService) {}

  @Get()
  async start() {
      return await this.postTextTweet();
  }

  @Get('post-text-tweet')
  async postTextTweet() {
    const text =  this.appService.scrapWeb();
    const textWithTags = this.appService.appendTags(text)
    const res: any = await this.socialService.postTextTweet(textWithTags);
    return this.appService.sendResponseFromTwitter(res);
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
    const res = await this.socialService.postImageTweet(imageData, webScrabConfig.tags.join(' '));
    return this.appService.sendResponseFromTwitter(res);
  }

}
