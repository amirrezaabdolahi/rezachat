export interface User {
    id: number
    username: string
    email?: string
    profile?: string
    status?: "online" | "offline"
}

export interface SigninPayload {
    username: string
    password: string
}

export interface SignupPayload {
    username: string
    email?: string
    password: string
}

export interface AuthResponse {
    success: boolean
    user: User
    token?: string // optional if your backend returns JWT or session token
}