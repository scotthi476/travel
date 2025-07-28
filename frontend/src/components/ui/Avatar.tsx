/**
 * Reusable Avatar component that displays user initials inside a colored circle.
 * Designed for use in cards, navbars, and profile elements.
 *
 * Example:
 * <Avatar name="Joe Smith" size="sm" />
 */

type Size = "sm" | "md" | "lg"

type Props = {
    name: string
    size?: Size
}

const Avatar = ({ name, size = "md" }: Props) => {
    const getInitials = (fullName: string) =>
        fullName
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase())
            .join("")

    const initials = getInitials(name)

    const sizeClass =
        size === "sm"
            ? "w-6 h-6 text-xs"
            : size === "lg"
            ? "w-16 h-16 text-lg"
            : "w-10 h-10 text-sm"
    const baseClass =
        "rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center"

    return (
        <div
            className={`${baseClass} ${sizeClass}`}
            aria-label={`Avatar for ${name}`}
            title={name}
        >
            {initials}
        </div>
    )
}

export default Avatar
