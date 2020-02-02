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
     const res = await this.appService.scrapWeb();
     return 'Tweet Posted Successfully';
  }

  @Get('post-text-tweet')
  async postTextTweet() {
    const text =  this.appService.scrapWeb();
    const res: any = await this.socialService.postTextTweet(text);

    if(res.data.status === 200) {
      return 'Tweet has been posted successfully!'
    } else {
      return 'Something went wrong while posting the tweet!'
    }
  }

  @Get('post-image-tweet')
  async postImageTweet() {
    let text = await this.appService.scrapWeb();
    const imageData = await this.appService.getImage(text);
    text = this.appService.appendTags(text);
    const res: any = await this.socialService.postImageTweet(imageData, text);

    if(res.resp.statusCode === 200) {
      return 'Tweet with Image posted successfully!'
    } else {
      return 'Something went wrong while posting the tweet!'
    }
  }
}
