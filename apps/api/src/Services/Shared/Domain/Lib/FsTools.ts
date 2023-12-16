import path from 'path';

export const cdnDir: string = path.join(
    process.cwd(),
    (process.env.CDN_DIR as string) || 'cdn/'
);

export const videoPoster = (videoUrl?: string | undefined) =>
    videoUrl !== undefined && videoUrl + '/poster';
