import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
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

function App() {
    return (
        <>
            <AuthProvider>
                <TripProvider>
                    <ExperienceProvider>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
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
