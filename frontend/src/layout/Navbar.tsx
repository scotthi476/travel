import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="bg-white">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Icon */}
                <Link to="/" className="text-xl font-bold text-orange-600">
                    Travel App
                </Link>

                {/* Search Bar */}
                <div className="flex-grow max-w-xl">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 rounded-md border"
                    />
                </div>

                {/* Navigation Links */}
                <div className="flex gap-4 text-sm font-medium">
                    <Link to="/experience" className="hover:text-orange-600">
                        Create Experience
                    </Link>
                    <Link to="/my-trips" className="hover:text-orange-600">
                        My Trips
                    </Link>
                    <Link to="/login" className="hover:text-orange-600">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
