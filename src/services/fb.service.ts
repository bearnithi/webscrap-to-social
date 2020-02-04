import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ApiSerice } from './api.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FBService {
    fbURL: string = 'https://graph.facebook.com/';

    constructor(private readonly api: ApiSerice) {
        this.fbURL += this.fbURL + process.env.FB_PAGE_ID;
    }

    async postText(text: string) {
        return await this.api.post(this.fbURL, {
            message: text,
            access_token: process.env.FB_PAGE_ACCESS_TOKEN
        });
    }
}