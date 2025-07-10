import type { Experience } from "./experience"

export interface Trip {
    id: string
    title: string
    userId: string
    experiences: Experience[] // from many-to-many join
}
