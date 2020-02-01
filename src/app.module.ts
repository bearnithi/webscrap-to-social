import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialNetworkService } from './services/social-network.service'
import { ImageMakerService } from './services/image-maker.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, SocialNetworkService, ImageMakerService],
})
export class AppModule {}
