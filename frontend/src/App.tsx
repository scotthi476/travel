import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MyTripsPage from "./pages/MyTripsPage"
import ExperiencePage from "./pages/ExperiencePage"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./router/ProtectedRoute"
import { ExperienceProvider } from "./contexts"
import { TripProvider } from "./contexts"
import { AuthProvider } from "./contexts/AuthContext"
import TripPage from "./pages/TripPage"
import ExperienceViewPage from "./pages/ExperienceViewPage"
import SearchResultsPage from "./pages/SearchResultsPage"
import MapPage from "./pages/MapPage"

function App() {
    return (
        <>
            <AuthProvider>
                <TripProvider>
                    <ExperienceProvider>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<HomePage />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route
                                    path="experience"
                                    element={<ExperiencePage />}
                                />
                                <Route
                                    path="experience/:experienceId"
                                    element={<ExperiencePage />}
                                />
                                <Route
                                    path="/experience/view/:id"
                                    element={<ExperienceViewPage />}
                                />
                                <Route
                                    path="my-trips"
                                    element={
                                        <ProtectedRoute>
                                            <MyTripsPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="trip"
                                    element={
                                        <ProtectedRoute>
                                            <TripPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="trip/:tripId"
                                    element={
                                        <ProtectedRoute>
                                            <TripPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/search"
                                    element={<SearchResultsPage />}
                                />
                                <Route path="map" element={<MapPage />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </ExperienceProvider>
                </TripProvider>
            </AuthProvider>
        </>
    )
}

export default App
