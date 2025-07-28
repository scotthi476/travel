import type { Trip } from "../types"
import { mockExperiences } from "./experiences"

const mockUser = {
    id: "mock-user",
    username: "demo_user",
    isLoggedIn: false,
    authMethod: "guest" as const,
}

export const mockTripList: Trip[] = [
    {
        id: "1",
        title: "California Trip",
        createdBy: mockUser,
        experiences: mockExperiences,
    },
    {
        id: "2",
        title: "New York Trip",
        createdBy: mockUser,
        experiences: mockExperiences,
    },
    {
        id: "3",
        title: "Hawaii Trip",
        createdBy: mockUser,
        experiences: mockExperiences,
    },
    {
        id: "4",
        title: "Tokyo Trip",
        createdBy: mockUser,
        experiences: mockExperiences,
    },
    {
        id: "5",
        title: "Chicago Trip",
        createdBy: mockUser,
        experiences: mockExperiences,
    },
    {
        id: "6",
        title: "Philadelphia Trip",
        createdBy: mockUser,
        experiences: mockExperiences,
    },
]
