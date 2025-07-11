import type { Keyword } from "./keyword"

export interface Experience {
    id: string
    title: string
    description: string
    imageUrl: string
    latitude: number
    longitude: number
    createdBy: string // user ID
    keywords?: Keyword[] // optional
    ratingAverage?: number // optional
}
