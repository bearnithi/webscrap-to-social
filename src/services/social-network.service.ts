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

    fbConfig = {
        appID: process.env.FB_APP_ID,
        appSecret: process.env.FB_APP_SECRET,
        pageID: process.env.FB_PAGE_ID,
        pageAccessToken: process.env.FB_PAGE_ACCESS_TOKEN
    }

    fbAPI: string = 'https://graph.facebook.com';

    tweetPosted: Subject<any> = new Subject<any>();

    async postFb(textData: string): Promise<any> {
        Axios.post(`${this.fbAPI}/${this.fbConfig.pageID}/feed?message=${textData}&access_token=${this.fbConfig.pageAccessToken}`).then((res) => {
            console.log(res);
        })
    }

    postTextTweet(textData: string) {
        const twitIns = new twit(this.twConfig);
        twitIns.post('statuses/update', {status: textData}).then((res) => {
            this.tweetPosted.next(res);
        });
    }

    async postImageTweet(imageData: string, textData: string) {
        const twitIns = new twit(this.twConfig);
        // imageData.replace('data:image/jpeg;base64','');
        twitIns.post('media/upload', { media_data: imageData }).then((res: any) => {
            console.log(res);
            const mediaIdStr = res.data.media_id_string;

            const meta_params = { media_id: mediaIdStr, alt_text: { text: textData } }
            twitIns.post('media/metadata/create', meta_params).then((mediaCreateRes) => {
                const params = { status: textData, media_ids: [mediaIdStr] }
                twitIns.post('statuses/update', params).then((res) => {
                    this.tweetPosted.next(res);
                })
            });
        })


        


    }
}

