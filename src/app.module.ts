import { Module, HttpModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialNetworkService } from './services/social-network.service'
import { ImageMakerService } from './services/image-maker.service';
import { InstagramService } from './services/instagram.service'
import { FBService } from './services/fb.service';
import { WebselectMiddleware } from './middlewares/webselect.middleware';
import { ApiSerice } from './services/api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, SocialNetworkService, ImageMakerService, ApiSerice, InstagramService, 
    FBService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WebselectMiddleware)
      .forRoutes('');
  }
}
