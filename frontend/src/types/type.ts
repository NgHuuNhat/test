export interface Root {
    data: Product[]
    meta: Meta
}

export interface Product {
    id: number
    documentId: string
    name: string
    price: number
    category: string
    stock: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    image: {
        url: string;
        formats?: {
            thumbnail?: {
                url: string;
            };
        };
    }[];
    orders: any[]
}

export interface Image {
    id: number
    documentId: string
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface Formats {
    thumbnail: Thumbnail
}

export interface Thumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
