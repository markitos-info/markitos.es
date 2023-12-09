class FaqCreateRequest {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly solution: string,
        public readonly tags: string
    ) {}
}

export default FaqCreateRequest;
