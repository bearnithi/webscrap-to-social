import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import Axios from 'axios';
import  * as twit from 'twit';
import { Subject } from 'rxjs';

dotenv.config();

@Injectable()
export class SocialNetworkService {
    twConfig = {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }

    async postTextTweet(textData: string) {
        const twitIns = new twit(this.twConfig);
        return await twitIns.post('statuses/update', {status: textData})
    }

    async postImageTweet(imageData: string, textData: string) {
        const twitIns = new twit(this.twConfig);

        const mediaRes: any = await twitIns.post('media/upload', { media_data: imageData });
        const mediaIdStr = mediaRes.data.media_id_string;

        const meta_params = { media_id: mediaIdStr, alt_text: { text: textData } }
        const mediaCreateRes = await twitIns.post('media/metadata/create', meta_params)
        
        const params = { status: textData, media_ids: [mediaIdStr] }
        const result = await twitIns.post('statuses/update', params);
        return result;
    }
}

