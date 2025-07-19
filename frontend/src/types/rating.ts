import type { Experience } from "./experience"
import type { User } from "./user"

export interface Rating {
    experience: Experience
    user: User
    rating: number
}
