import type { Experience } from "./experience"
import type { User } from "./user"

export interface Trip {
    id: string
    title: string
    createdBy: User
    users?: User[] // optional
    experiences: Experience[] // from many-to-many join
}

export type TripFormData = Omit<Trip, "id" | "createdBy">
