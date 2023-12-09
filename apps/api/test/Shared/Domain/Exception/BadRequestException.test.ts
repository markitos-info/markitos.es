import BadRequestException from '../../../../src/Services/Shared/Domain/Exception/BadRequestException';
import DomainException from '../../../../src/Services/Shared/Domain/Exception/DomainException';
import { SharedMother } from '../../SharedMother';

const sut: BadRequestException = SharedMother.BadRequestException();

describe('BadRequestException', () => {
    it('should be an Error', () => {
        expect(sut).toBeInstanceOf(Error);
    });

    it('should be a DomainException', () => {
        expect(sut).toBeInstanceOf(DomainException);
    });
});
