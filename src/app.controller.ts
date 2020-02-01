import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SocialNetworkService } from './services/social-network.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly socialService: SocialNetworkService) {}

  @Get()
  async start() {
     const res = await this.appService.scrapWeb();
     return 'Tweet Posted Successfully';
  }
}
