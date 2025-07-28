import type { Trip } from "./trip"
import type { User } from "./user"

export interface Experience {
    id: string
    title: string
    description: string
    imageUrl: string
    date?: Date | string // optional
    rating?: number // optional
    latitude: number
    longitude: number
    user: User
    isPublic: boolean
    trips?: Trip[] // optional
    keywords?: string[] // optional
    ratingAverage?: number // optional
}

export type ExperienceFormData = Omit<
    Experience,
    "id" | "user" | "ratingAverage" | "trips"
>
