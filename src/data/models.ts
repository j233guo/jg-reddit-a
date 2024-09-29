export interface IPost {
    id: string
    author: string
    created_utc: number
    media: any
    media_metadata: Record<string, IMediaMetadata>
    name: string
    num_comments: number
    permalink: string
    preview: any
    score: number
    selftext: string
    selftext_html: string
    subreddit: string
    thumbnail: string
    title: string
    url: string
}

export interface IComment {
    id: string
    author: string
    created_utc: number
    body: string
    body_html: string
    name: string
    permalink: string
    score: number
}

export interface IMediaMetadataImage {
    x: number,
    y: number,
    u?: string,
    gif?: string
    mp4?: string
}

export interface IMediaMetadata {
    // media type
    e: string
    id: string
    // media file format
    m: string
    o: IMediaMetadataImage[]
    p: IMediaMetadataImage[]
    s: IMediaMetadataImage
    status: string
}

export interface ISubreddit {
    name: string;
}
