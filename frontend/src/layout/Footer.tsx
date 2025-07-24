/**
 * Global footer with useful links and copyright.
 */

import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-zinc-100 border-t border-zinc-200 py-6 mt-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
                {/* Footer nav links */}
                <nav
                    className="flex flex-wrap justify-center gap-6"
                    aria-label="Footer links"
                >
                    <Link to="/about" className="hover:underline">
                        About
                    </Link>
                    <a
                        href="https://github.com/scotthi476/travel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        GitHub
                    </a>
                </nav>

                {/* Copyright */}
                <p className="text-center">
                    &copy; {new Date().getFullYear()} Crowd-Sourced Travel App.
                    All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
