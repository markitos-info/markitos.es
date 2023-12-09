import PrimitiveType from '../../../../Shared/Domain/Action/PrimitiveType';

interface FaqType extends PrimitiveType {
    id: string;
    title: string;
    solution: string;
    tags: string;
    createdAt: Date;
}

export default FaqType;
