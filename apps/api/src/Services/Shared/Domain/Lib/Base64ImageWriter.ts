interface Base64ImageWriter {
    write(filenameWithAbsolutePath: string): Promise<string>;
}

export default Base64ImageWriter;
