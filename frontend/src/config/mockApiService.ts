// mockApiService.ts - Mock API that uses local state instead of backend
import type { User, Experience, Trip } from "../types"

// Mock data storage (simulates a database)
let mockData = {
    users: [
        {
            id: 1,
            createdAt: "2024-01-01T00:00:00Z",
            createdBy: "system",
            username: "john_doe",
            isLoggedIn: true,
        },
        {
            id: 2,
            createdAt: "2024-01-02T00:00:00Z",
            createdBy: "system",
            username: "jane_smith",
            isLoggedIn: false,
        },
    ] as User[],

    experiences: [
        {
            id: 1,
            createdAt: "2024-01-01T00:00:00Z",
            createdBy: "john_doe",
            title: "Amazing Sunset at Grand Canyon",
            description:
                "Witnessed the most beautiful sunset ever at the Grand Canyon. The colors were absolutely breathtaking!",
            imageUrl: "https://example.com/sunset.jpg",
            date: "2024-01-15",
            rating: 5,
            latitude: 36.1069,
            longitude: -112.1129,
            isPublic: true,
            keywords: ["sunset", "nature", "grand canyon"],
            ratingAverage: 4.8,
        },
        {
            id: 2,
            createdAt: "2024-01-03T00:00:00Z",
            createdBy: "jane_smith",
            title: "Local Coffee Shop Discovery",
            description:
                "Found this amazing local coffee shop with the best latte in town!",
            imageUrl: "https://example.com/coffee.jpg",
            latitude: 40.7128,
            longitude: -74.006,
            isPublic: true,
            keywords: ["coffee", "local", "cafe"],
        },
    ] as Experience[],

    trips: [
        {
            id: 1,
            createdAt: "2024-01-01T00:00:00Z",
            createdBy: "john_doe",
            title: "Southwest Adventure",
            collaborators: ["jane_smith"],
            experiences: ["1"],
        },
        {
            id: 2,
            createdAt: "2024-01-05T00:00:00Z",
            createdBy: "jane_smith",
            title: "NYC Food Tour",
            experiences: ["2"],
        },
    ] as Trip[],
}

// Helper to get next ID
const getNextId = (model: keyof typeof mockData): number => {
    const items = mockData[model]
    return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
}

// Helper to simulate network delay
const delay = (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms))

// Mock API service that simulates real API calls
export const mockApiService = {
    async get<T>(endpoint: string): Promise<T> {
        console.log(`🔗 Mock API GET: ${endpoint}`)
        await delay(300) // Simulate network delay

        if (endpoint === "users") return mockData.users as T
        if (endpoint === "experiences") return mockData.experiences as T
        if (endpoint === "trips") return mockData.trips as T

        throw new Error(`Unknown endpoint: ${endpoint}`)
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
        console.log(`🔗 Mock API POST: ${endpoint}`, data)
        await delay(500)

        const newItem = {
            id: getNextId(endpoint as keyof typeof mockData),
            createdAt: new Date().toISOString(),
            createdBy: "current_user", // In real app, get from auth
            ...data,
        }

        if (endpoint === "users") {
            mockData.users.push(newItem as User)
            return newItem as T
        }
        if (endpoint === "experiences") {
            mockData.experiences.push(newItem as Experience)
            return newItem as T
        }
        if (endpoint === "trips") {
            mockData.trips.push(newItem as Trip)
            return newItem as T
        }

        throw new Error(`Unknown endpoint: ${endpoint}`)
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
        console.log(`🔗 Mock API PUT: ${endpoint}`, data)
        await delay(400)

        const [model, idStr] = endpoint.split("/")
        const id = parseInt(idStr)

        if (model === "users") {
            const index = mockData.users.findIndex((item) => item.id === id)
            if (index === -1) throw new Error("User not found")

            mockData.users[index] = {
                ...mockData.users[index],
                ...data,
                updatedAt: new Date().toISOString(),
            }
            return mockData.users[index] as T
        }

        if (model === "experiences") {
            const index = mockData.experiences.findIndex(
                (item) => item.id === id
            )
            if (index === -1) throw new Error("Experience not found")

            mockData.experiences[index] = {
                ...mockData.experiences[index],
                ...data,
                updatedAt: new Date().toISOString(),
            }
            return mockData.experiences[index] as T
        }

        if (model === "trips") {
            const index = mockData.trips.findIndex((item) => item.id === id)
            if (index === -1) throw new Error("Trip not found")

            mockData.trips[index] = {
                ...mockData.trips[index],
                ...data,
                updatedAt: new Date().toISOString(),
            }
            return mockData.trips[index] as T
        }

        throw new Error(`Unknown endpoint: ${endpoint}`)
    },

    async delete(endpoint: string): Promise<void> {
        console.log(`🔗 Mock API DELETE: ${endpoint}`)
        await delay(300)

        const [model, idStr] = endpoint.split("/")
        const id = parseInt(idStr)

        if (model === "users") {
            const index = mockData.users.findIndex((item) => item.id === id)
            if (index === -1) throw new Error("User not found")
            mockData.users.splice(index, 1)
            return
        }

        if (model === "experiences") {
            const index = mockData.experiences.findIndex(
                (item) => item.id === id
            )
            if (index === -1) throw new Error("Experience not found")
            mockData.experiences.splice(index, 1)
            return
        }

        if (model === "trips") {
            const index = mockData.trips.findIndex((item) => item.id === id)
            if (index === -1) throw new Error("Trip not found")
            mockData.trips.splice(index, 1)
            return
        }

        throw new Error(`Unknown endpoint: ${endpoint}`)
    },

    // Helper to reset mock data (useful for testing)
    resetData() {
        console.log("🔄 Resetting mock data")
        mockData = {
            users: [
                {
                    id: 1,
                    createdAt: "2024-01-01T00:00:00Z",
                    createdBy: "system",
                    username: "john_doe",
                    isLoggedIn: true,
                },
            ] as User[],
            experiences: [],
            trips: [],
        }
    },

    // Helper to inspect current data (useful for testing)
    getCurrentData() {
        return { ...mockData }
    },
}
