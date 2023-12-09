class FaqDeleteResponse {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly solution: string,
        public readonly createdAt: Date
    ) {}
}

export default FaqDeleteResponse;
