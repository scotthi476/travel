/**
 * Reusable card layout component.
 * Useful for wrapping form sections, content blocks, or modals.
 *
 * Example:
 * <ShadowCard title="Create Experience">
 *   <TextInput ... />
 *   <Button>Submit</Button>
 * </ShadowCard>
 */

import type { ReactNode } from "react"
import Logo from "../../public/logo.png"

type Props = {
    // Card content
    children: ReactNode

    // Optional additional styling for layout flexibility
    className?: string
    // Optional aria-label for accessibility
    ariaLabel?: string
}

const ShadowCard = ({
    children,
    ariaLabel = "Card Section",
    className = "",
}: Props) => {
    return (
        <section
            aria-label={ariaLabel}
            className={`px-8 py-6 my-6 mx-auto shadow-2xl border border-zinc-300 rounded-2xl bg-white ${className}`}
        >
            <div className="flex flex-col items-center">
                <img
                    src={Logo}
                    alt="Crowd Travel logo"
                    className="h-14 w-14 md:h-16 md:w-16 mb-3 mx-auto select-none pointer-events-none"
                />
            </div>
            {children}
        </section>
    )
}

export default ShadowCard
