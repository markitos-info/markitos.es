import fs from 'fs';
import BadRequestException from '../Exception/BadRequestException';

class FilePath {
    constructor(public readonly value: string) {
        this.validateOrThrowException();
    }

    protected validateOrThrowException(): void {
        try {
            if (fs.lstatSync(this.value).isFile()) {
                return;
            }
        } catch (_) {
            /* ignore */
        }

        this.throwException();
    }

    protected throwException(): void {
        throw new BadRequestException('invalid file path ' + this.value);
    }
}

export default FilePath;
