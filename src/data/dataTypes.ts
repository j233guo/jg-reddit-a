export interface IReturnData {
    data: any
    kind: string
}

export interface IPost {
    id: string
    author: string
    created_utc: number
    media: any
    media_metadata: any
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

export interface IMediaMetadata {

}
