import { Injectable } from "@nestjs/common";
import * as jimp from 'jimp';
import * as fs from 'fs';
import Axios from "axios";

@Injectable()
export class ImageMakerService {
    imageWidth = 1200;
    imageHeight = 675;
    constructor() {}

    async readImageAndMakeBase64(url: string) {
        const image: any = await Axios.get(url, {
            responseType: 'arraybuffer'
        });

        const finishedImage = Buffer.from(image.data, 'binary').toString('base64');
        return finishedImage
    }

    async makeImageWithBg(text: string) {
        const images = fs.readdirSync('assets/images/samples/');
        let chosenImage: any = images[Math.floor(Math.random() * images.length)];
        let x = 20;
        let y = 100;
        
        const image = await jimp.read(`assets/images/samples/${chosenImage}`);
        image.color([{apply: 'shade', params: [40]}]);
        const font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE)
        image.print(font, x, y, {
            text: text,
            alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: jimp.VERTICAL_ALIGN_TOP
        }, this.imageWidth, this.imageHeight);
        const fileName = 'temp' + '.jpg'
        const imgBuffer = await image.writeAsync(`assets/images/${fileName}`); 
        const finishedImage = await fs.readFileSync(`assets/images/${fileName}`, { encoding: 'base64'});
        return finishedImage;

    }

    async makeTwitterImage(text: string) {
       let image = new jimp(this.imageWidth, this.imageHeight, '#f5f5f5', (err, image) => {
           if(err) throw err;
       });

       let x = 20;
       let y = 100;


       const font = await jimp.loadFont(jimp.FONT_SANS_64_BLACK)
       image.print(font, x, y, {
           text: text,
           alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
           alignmentY: jimp.VERTICAL_ALIGN_TOP
       }, this.imageWidth, this.imageHeight);
       const fileName = 'temp' + '.jpg'
       const imgBuffer = await image.writeAsync(`assets/images/${fileName}`); 
       const finishedImage = await fs.readFileSync(`assets/images/${fileName}`, { encoding: 'base64'});
       return finishedImage;
    }
}