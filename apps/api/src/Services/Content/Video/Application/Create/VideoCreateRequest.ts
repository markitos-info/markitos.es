class VideoCreateRequest {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly tags: string,
        public readonly url: string,
        public poster: string,
        public readonly playlist: string | undefined,
        public readonly playlistTitle: string | undefined,
        public readonly position: number | undefined
    ) {}
}

export default VideoCreateRequest;
