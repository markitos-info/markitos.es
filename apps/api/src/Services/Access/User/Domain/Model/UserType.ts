import PrimitiveType from '../../../../Shared/Domain/Action/PrimitiveType';

interface UserType extends PrimitiveType {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: string;
}

export default UserType;
