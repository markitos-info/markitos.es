import PrimitiveType from '../../../../Shared/Domain/Action/PrimitiveType';

interface UserPublicType extends PrimitiveType {
    id: string;
    name: string;
    createdAt: string;
}

export default UserPublicType;
