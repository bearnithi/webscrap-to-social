import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SocialNetworkService } from './services/social-network.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly socialService: SocialNetworkService) {}

  @Get()
  async start() {
     this.appService.scrapWeb();
     this.socialService.tweetPosted.subscribe((res: any) => {
       console.log(res);
       return res;
     });
  }
}
