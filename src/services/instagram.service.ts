import * as pptr from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramService {
    instagramBaseURL: string = 'https://instagram.com';

    constructor() {

    }

    async login() {
        const browser = await pptr.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 320, height: 568 });
        await page.goto(this.instagramBaseURL, {
            waitUntil: 'networkidle0',
          });
          await page.screenshot({path: 'assets/images/shots/buddy-screenshot.png'});
        let fileUploader: any = await page.evaluate(() => {
            let fileUploader = document.querySelector("input[type='file']");
            return fileUploader;
        });

       const res = await fileUploader.uploadFile('assets/images/temp.jpg');
       await document.querySelector('form').submit();
       await page.waitForNavigation({waitUntil: 'networkidle0'})
    }

}
