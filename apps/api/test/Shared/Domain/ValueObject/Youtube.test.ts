import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import { SharedMother } from '../../SharedMother';

describe('Test para youtube urls', () => {
    it('should be valid and set id and image', () => {
        const urs = [
            {
                test: 'https://www.youtube.com/shorts/5r7QeUnpLKE?feature=share',
                expected: '5r7QeUnpLKE',
            },
            {
                test: '//www.youtube-nocookie.com/embed/PonXvChomak?rel=0',
                expected: 'PonXvChomak',
            },
            {
                test: 'https://www.youtube.com/watch?v=PonXvChomak&feature=channel',
                expected: 'PonXvChomak',
            },
            {
                test: 'https://www.youtube.com/watch?v=wnxMg4Urro8&playnext_from=TL&videos=osPknwzXEas&feature=sub',
                expected: 'wnxMg4Urro8',
            },
            {
                test: 'https://www.youtube.com/ytscreeningroom?v=wnxMg4Urro8',
                expected: 'wnxMg4Urro8',
            },
            {
                test: 'https://www.youtube.com/user/AnnafromUkrainej#p/a/u/2/g-Z_hxmynIM',
                expected: 'g-Z_hxmynIM',
            },
            { test: 'https://youtu.be/sTu3LwpF6XI', expected: 'sTu3LwpF6XI' },
            {
                test: 'https://www.youtube.com/watch?v=sTu3LwpF6XI&feature=youtu.be',
                expected: 'sTu3LwpF6XI',
            },
            { test: 'https://youtu.be/sTu3LwpF6XI', expected: 'sTu3LwpF6XI' },
            {
                test: 'https://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
                expected: '1p3vcRhsYGo',
            },
            {
                test: 'https://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
                expected: '1p3vcRhsYGo',
            },
            {
                test: 'https://www.youtube.com/watch?v=sTu3LwpF6XI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://www.youtube.com/embed/5r7QeUnpLKE?rel=0',
                expected: '5r7QeUnpLKE',
            },
            {
                test: 'https://www.youtube.com/watch?v=JYYajVARdZ0',
                expected: 'JYYajVARdZ0',
            },
            {
                test: 'https://youtube.com/v/sTu3LwpF6XI?feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://youtube.com/vi/sTu3LwpF6XI?feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://youtube.com/?v=sTu3LwpF6XI&feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://www.youtube.com/watch?v=sTu3LwpF6XI&feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://youtube.com/?vi=sTu3LwpF6XI&feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://youtube.com/watch?v=sTu3LwpF6XI&feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://youtube.com/watch?vi=sTu3LwpF6XI&feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://youtu.be/sTu3LwpF6XI?feature=youtube_gdata_player',
                expected: 'sTu3LwpF6XI',
            },
            {
                test: 'https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router',
                expected: '',
            },
            {
                test: 'https://gist.github.com/takien/4077195',
                expected: '',
            },
        ];

        urs.forEach((url) => {
            if (url.expected === '') {
                expect(() => SharedMother.Youtube(url.test)).toThrowError(
                    BadRequestException
                );
            }
            if (url.expected !== '') {
                expect(SharedMother.Youtube(url.test).id).toBe(url.expected);
            }
        });
    });
});
