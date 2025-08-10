/**
 * Global navigation bar with icon, search, and links.
 */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import SearchBar from "../components/forms/SearchBar"
import Logo from "../../public/logo.png"

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { currentUser } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate("/")
            setMobileMenuOpen(false)
        } catch (error) {
            console.error("Failed to log out: ", error)
        }
    }

    return (
        <nav className="bg-zinc-100 border-b border-zinc-200">
            <div className="container mx-auto flex items-center justify-between px-6 py-20 gap-2">
                {/* Icon */}
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Crowd Sourced Travel App logo"
                        className="h-14 w-14 md:h-16 md:w-16 mx-auto select-none pointer-events-none"
                    />{" "}
                </Link>

                {/* Desktop Search */}
                <SearchBar />

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-700">
                    <Link to="/" className="hover:text-orange-600 transition">
                        Home
                    </Link>
                    <Link
                        to="/experience"
                        className="hover:text-orange-600 transition"
                    >
                        Create Experience
                    </Link>
                    <Link
                        to="/my-trips"
                        className="hover:text-orange-600 transition"
                    >
                        My Trips
                    </Link>
                    {currentUser ? (
                        <>
                            <button
                                onClick={handleLogout}
                                className="hover:text-orange-600 transition hover:cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="hover:text-orange-600 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-orange-600 focus:outline-none cursor-pointer"
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMobileMenuOpen && (
                <div className="sm:hidden px-6 pb-4 flex flex-col gap-3 text-sm font-medium text-zinc-700">
                    <Link
                        to="/experience"
                        className="hover:text-orange-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Create Experience
                    </Link>
                    <Link
                        to="/my-trips"
                        className="hover:text-orange-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        My Trips
                    </Link>
                    {currentUser ? (
                        <>
                            <Link
                                to="/profile"
                                className="hover:text-orange-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                className="hover:text-orange-600 text-left"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="hover:text-orange-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
