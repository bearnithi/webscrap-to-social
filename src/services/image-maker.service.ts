import { Injectable } from "@nestjs/common";
import * as jimp from 'jimp';
import * as fs from 'fs';

@Injectable()
export class ImageMakerService {
    imageWidth = 1200;
    imageHeight = 675;
    constructor() {}

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