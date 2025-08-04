/**
 * Global navigation bar with icon, search, and links.
 */

import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    // TODO: replace with actual user context when ready
    const user = null

    return (
        <nav className="bg-zinc-100 border-b border-zinc-200">
            <div className="container mx-auto flex items-center justify-between px-6 py-20 gap-6">
                {/* Icon */}
                <Link
                    to="/"
                    className="text-xl font-bold text-orange-600 whitespace-nowrap"
                >
                    Travel App
                </Link>

                {/* Desktop Search */}
                <div className="flex-1 max-w-md hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-zinc-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-700">
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
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="hover:text-orange-600 transition"
                            >
                                Profile
                            </Link>
                            <button className="hover:text-orange-600 transition">
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
                    className="sm:hidden text-orange-600 focus:outline-none cursor-pointer"
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
                    {user ? (
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
                                onClick={() => setMobileMenuOpen(false)}
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
