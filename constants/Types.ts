export type Book = {
    title: string
    author_name: string[]
    author_key: string[]
    cover_i: number
    first_publish_year: number
    key: string
    subject: string[]
    publisher: string[]
}

export type searchApiResponseType = {
    numFound: number
    start: number
    docs: Book[]
    q: string
}

export type searchApiQueryType = {
    q: string
    limit: number
    page: number
}

export type imageQueryType = {
    key: string
    value: string
    size: 'S' | 'M' | 'L'
}
