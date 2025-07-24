export interface User {
    id: string
    username: string
    isLoggedIn: boolean
    authMethod: "google" | "email" | "guest"
}
