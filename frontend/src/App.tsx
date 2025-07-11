import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MyTrips from "./pages/MyTrips"
import Experience from "./pages/Experience"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./router/ProtectedRoute"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="experience" element={<Experience />} />
                    <Route
                        path="my-trips"
                        element={
                            <ProtectedRoute>
                                <MyTrips />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
