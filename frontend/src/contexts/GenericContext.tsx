import { createContext, useContext, useReducer, type ReactNode } from "react"
import { type GenericModel } from "../types"
import { apiService } from "../config/apiService"

// Generic state that will work for each of the different models (experiences, trips, auth)
interface GenericState<T extends GenericModel> {
    items: T[]
    isLoading: boolean
    error: string | null
    loaded: boolean
}

// Generic action types
type GenericAction<T extends GenericModel> =
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "LOAD_ITEMS"; payload: T[] }
    | { type: "ADD_ITEM"; payload: T }
    | { type: "UPDATE_ITEM"; payload: T }
    | { type: "DELETE_ITEM"; payload: string }

// Generic context type
interface GenericContextType<T extends GenericModel> {
    items: T[]
    isLoading: boolean
    error: string | null
    loaded: boolean
    loadItems: () => Promise<void>
    createItem: (
        data: Omit<T, "id" | "createdBy" | "createdAt" | "updatedAt">
    ) => Promise<void>
    updateItem: (
        id: string,
        data: Partial<Omit<T, "id" | "createdBy" | "createdAt" | "updatedAt">>
    ) => Promise<void>
    deleteItem: (id: string) => Promise<void>
    getById: (id: string | number) => T | undefined
    clearError: () => void
}

// Generic reducer
function createGenericReducer<T extends GenericModel>() {
    return (
        state: GenericState<T>,
        action: GenericAction<T>
    ): GenericState<T> => {
        switch (action.type) {
            case "SET_LOADING":
                return { ...state, isLoading: action.payload }
            case "SET_ERROR":
                return { ...state, error: action.payload, isLoading: false }
            case "LOAD_ITEMS":
                return {
                    ...state,
                    items: action.payload,
                    isLoading: false,
                    error: null,
                    loaded: true,
                }
            case "ADD_ITEM":
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    isLoading: false,
                    error: null,
                }
            case "UPDATE_ITEM":
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id ? action.payload : item
                    ),
                    isLoading: false,
                    error: null,
                }
            case "DELETE_ITEM":
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => item.id !== action.payload
                    ),
                    isLoading: false,
                    error: null,
                }
            default:
                return state
        }
    }
}

// Configuration for each data model
export interface ModelConfig {
    endpoint: string // 'users', 'experiences', 'trips'
    displayName: string // 'User', 'Experience', 'Trip
}

// Create model specific context
export function createModelContext<T extends GenericModel>(
    config: ModelConfig
) {
    const ModelContext = createContext<GenericContextType<T> | null>(null)
    // Initial state for model
    const initialState: GenericState<T> = {
        items: [], // User[], Experience[], Trip[] depending on T
        isLoading: false,
        error: null,
        loaded: false,
    }

    // Create reducer for this model
    const genericReducer = createGenericReducer<T>()

    // Create reducer for model
    function GenericProvider({ children }: { children: ReactNode }) {
        // This useReducer is typed specifically for T
        // If T is User, state.items will be User[]
        // If T is Experience, state.items will be Experience[]
        // If T is Trip, state.items will be Trip[]
        const [state, dispatch] = useReducer(genericReducer, initialState)

        // Functions for specified type T
        // Load items
        const loadItems = async () => {
            try {
                dispatch({ type: "SET_LOADING", payload: true })
                const items = await apiService.get<T[]>(config.endpoint)
                dispatch({ type: "LOAD_ITEMS", payload: items })
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: (error as Error).message,
                })
            }
        }

        // Create item
        const createItem = async (
            data: Omit<T, "id" | "createdBy" | "createdAt" | "updatedAt">
        ) => {
            try {
                dispatch({ type: "SET_LOADING", payload: true })
                const newItem = await apiService.post<T>(config.endpoint, data)
                dispatch({ type: "ADD_ITEM", payload: newItem })
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: (error as Error).message,
                })
            }
        }

        // Update item
        const updateItem = async (
            id: string,
            data: Partial<
                Omit<T, "id" | "createdBy" | "createdAt" | "updatedAt">
            >
        ) => {
            try {
                dispatch({ type: "SET_LOADING", payload: true })
                const updatedItem = await apiService.put<T>(
                    `${config.endpoint}/${id}`,
                    data
                )
                dispatch({ type: "UPDATE_ITEM", payload: updatedItem })
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: (error as Error).message,
                })
            }
        }

        // Delete item
        const deleteItem = async (id: string): Promise<void> => {
            try {
                dispatch({ type: "SET_LOADING", payload: true })
                await apiService.delete(`${config.endpoint}/${id}`)
                dispatch({ type: "DELETE_ITEM", payload: id })
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: (error as Error).message,
                })
            }
        }

        // Get item by ID
        const getById = (id: string | number): T | undefined => {
            const numericId = typeof id === "string" ? parseInt(id, 10) : id
            return state.items.find((item) => (item.id as any) === numericId)
        }

        // Clear error
        const clearError = () => {
            dispatch({ type: "SET_ERROR", payload: null })
        }

        // Context value for specified T
        const contextValue: GenericContextType<T> = {
            items: state.items, // User[], Experience[], Trip[]
            isLoading: state.isLoading,
            error: state.error,
            loaded: state.loaded,
            loadItems,
            createItem,
            updateItem,
            deleteItem,
            getById,
            clearError,
        }

        return (
            <ModelContext.Provider value={contextValue}>
                {children}
            </ModelContext.Provider>
        )
    }

    function useGenericContext(): GenericContextType<T> {
        const context = useContext(ModelContext)
        if (!context) {
            throw new Error(
                `useGenericContext must be used within ${config.displayName}Provider`
            )
        }
        return context
    }

    return {
        GenericProvider, // Provider component specifically for type T
        useGenericContext, // Hook specifically for type T
        ModelContext, // Context specifically for type T
    }
}
