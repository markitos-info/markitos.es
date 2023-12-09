import imageToBase64 from 'image-to-base64';
import { Base64 } from 'js-base64';
import Base64Tool from '../Domain/Lib/Base64Tool';

class Base64Danko implements Base64Tool {
    async encodeImageUrl(imageUrl: string): Promise<string> {
        return imageToBase64(imageUrl);
    }
    async encode(decodedValue: string): Promise<string> {
        return Base64.toBase64(decodedValue);
    }
    async decode(encodedValue: string): Promise<string> {
        return Base64.fromBase64(encodedValue);
    }

    static fromImageUrlToBase64ToString(imageUrl: string): Promise<string> {
        return new Base64Danko().encodeImageUrl(imageUrl);
    }
    static fromBase64ToString(decodedValue: string): Promise<string> {
        return new Base64Danko().decode(decodedValue);
    }
    static fromStringToBase64(encodedValue: string): Promise<string> {
        return new Base64Danko().encode(encodedValue);
    }
}

export default Base64Danko;
