interface Base64Tool {
    encode(decodedValue: string): Promise<string>;
    decode(encodedValue: string): Promise<string>;
    encodeImageUrl(imageUrl: string): Promise<string>;
}

export default Base64Tool;
