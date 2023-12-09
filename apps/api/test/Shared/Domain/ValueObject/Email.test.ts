import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import { SharedMother } from '../../SharedMother';

describe('Test para email', () => {
    it('should be valid', () => {
        expect(() => {
            SharedMother.Email('example@example.comM');
            SharedMother.Email('a@m.co');
            SharedMother.Email('example1@eXample.com');
            SharedMother.Email('e@ex.comv');
        }).not.toThrowError();
    });

    it('should turn off the world', () => {
        expect(() => {
            SharedMother.Email('non-valid-email');
        }).toThrowError();
    });

    it('should be a domain exception', () => {
        expect(() => {
            SharedMother.Email('non-valid-email');
        }).toThrow(BadRequestException);
    });
});
