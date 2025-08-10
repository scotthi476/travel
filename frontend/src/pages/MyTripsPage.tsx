import type { Trip } from "../types/index.ts"
import "./TripList.tsx"
import TripList from "./TripList.tsx"
import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button.tsx"
import { useExperienceContext, useTripContext } from "../contexts/index.ts"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext.tsx"
import ExperienceCard from "../features/experience/ExperienceCard.tsx"
import ShadowCard from "../layout/ShadowCard.tsx"

//Reference : https://www.youtube.com/watch?v=R1uTPIOuT8s React Simple CRUD Application

const MyTripsPage = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { items: trips, loadItems, deleteItem } = useTripContext()
    const { items: experiences, loadItems: loadExperiences } =
        useExperienceContext()

    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

    useEffect(() => {
        loadItems()
        loadExperiences()
    }, [])

    const userTrips = trips.filter(
        (trip) => trip.createdBy === currentUser?.uid
    )

    const selectedTripExperiences = selectedTrip
        ? experiences.filter((exp) =>
              selectedTrip.experiences.includes(exp.id.toString())
          )
        : []

    const handleAddTrip = () => {
        navigate("/trip")
    }

    const handleEditTrip = (trip: Trip) => {
        navigate(`/trip/${trip.id}`)
    }

    const handleDeleteTrip = (trip: Trip) => {
        deleteItem(trip.id)
        if (selectedTrip?.id === trip.id) {
            setSelectedTrip(null)
        }
    }

    const handleSelectTrip = (trip: Trip) => {
        setSelectedTrip(trip)
    }

    return (
        <>
            <div>
                <br />
                <h1>My Trips</h1>
                <br />
            </div>
            <section>
                <Button onClick={handleAddTrip}>Add Trip</Button>
                <TripList
                    list={userTrips}
                    onDeleteClickHnd={handleDeleteTrip}
                    onEdit={handleEditTrip}
                    onSelect={handleSelectTrip}
                    selectedTripId={selectedTrip?.id}
                />
            </section>
            {selectedTrip ? (
                <section className="mt-8">
                    <ShadowCard>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Trip Details for: {selectedTrip.title}
                            </h2>
                            <Button onClick={() => setSelectedTrip(null)}>
                                Clear Selection
                            </Button>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                Created:{" "}
                                {new Date(
                                    selectedTrip.createdAt
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                Experiences: {selectedTrip.experiences.length}
                            </p>
                            {selectedTrip.collaborators &&
                                selectedTrip.collaborators.length > 0 && (
                                    <p className="text-gray-600">
                                        Collaborators:{" "}
                                        {selectedTrip.collaborators.join(", ")}
                                    </p>
                                )}
                        </div>

                        {selectedTripExperiences.length > 0 ? (
                            <div>
                                <h3 className="text-lg font-medium mb-4">
                                    Experiences in this trip:
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {selectedTripExperiences.map(
                                        (experience) => (
                                            <ExperienceCard
                                                key={experience.id}
                                                experience={experience}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p>No experiences in this trip yet.</p>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate("/")}
                                >
                                    Browse Experiences
                                </Button>
                            </div>
                        )}
                    </ShadowCard>
                </section>
            ) : (
                <div className="mt-8">Select a trip above to view details</div>
            )}
        </>
    )
}

export default MyTripsPage
