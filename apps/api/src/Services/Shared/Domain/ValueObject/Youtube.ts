import BadRequestException from '../Exception/BadRequestException';

class Youtube {
    public readonly id: string;
    public readonly value: string;
    public readonly image: string;

    constructor(value: string) {
        this.id = this.setId(value);
        this.value = `http://www.youtube.com/embed/${this.id}`;
        this.image = `https://img.youtube.com/vi_webp/${this.id}/hqdefault.webp`;
    }

    protected throwException(): void {
        throw new BadRequestException(`invalid youtube url ${this.value}`);
    }

    private setId(value: string): string {
        const arr = value.split(
            // eslint-disable-next-line no-useless-escape
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
        );
        if (arr.length < 2) this.throwException();

        const result: string = undefined !== arr[1] ? arr[1] : '';
        if (result === '') this.throwException();

        return result;
    }
}

export default Youtube;
