export interface GenericModel {
    id: string
    createdAt: string
    createdBy: string
    updatedAt?: string
}

export interface Experience extends GenericModel {
    title: string
    description: string
    imageUrl: string
    date?: string // optional
    rating?: number // optional
    latitude: number
    longitude: number
    isPublic: boolean
    keywords?: string[] // optional
    ratingAverage?: number // optional community ratings
    communityRatingCount?: number // total community ratings
}

export interface Trip extends GenericModel {
    title: string
    collaborators?: string[] // optional
    experiences: string[] // one-to-many join
}

export interface User extends GenericModel {
    username: string
    isLoggedIn: boolean
}

export interface PaginationResult<T> {
    currentData: T[]
    currentPage: number
    totalPages: number
    totalItems: number
    hasNext: boolean
    hasPrev: boolean
    goToPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    goToFirst: () => void
    goToLast: () => void
}
