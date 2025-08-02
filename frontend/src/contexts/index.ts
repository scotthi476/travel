import { createModelContext } from "./GenericContext"
import type { Trip, Experience } from "../types"

// Create context instances for each model
// Experience context
export const {
    GenericProvider: ExperienceProvider,
    useGenericContext: useExperienceContext,
    ModelContext: ExperienceContext,
} = createModelContext<Experience>({
    endpoint: "experiences",
    displayName: "Experience",
})

// Trip context
export const {
    GenericProvider: TripProvider,
    useGenericContext: useTripContext,
    ModelContext: TripContext,
} = createModelContext<Trip>({
    endpoint: "trips",
    displayName: "Trip",
})
