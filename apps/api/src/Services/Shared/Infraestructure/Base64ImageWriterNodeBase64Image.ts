import { randomUUID } from 'crypto';
import { decode } from 'node-base64-image';
import BadRequestException from '../Domain/Exception/BadRequestException';
import Base64ImageWriter from '../Domain/Lib/Base64ImageWriter';
import { cdnDir } from '../Domain/Lib/FsTools';

class Base64ImageWriterNodeBase64Image implements Base64ImageWriter {
    async write(encode: string, extension: string = 'jpg'): Promise<string> {
        try {
            const imageName = randomUUID();
            const imageFullPath = `${cdnDir}${imageName}`;
            await decode(encode, {
                fname: imageFullPath,
                ext: extension,
            });

            return `${imageName}.${extension}`;
        } catch (error) {
            throw new BadRequestException('invalid base64 image');
        }
    }
}

export default Base64ImageWriterNodeBase64Image;
