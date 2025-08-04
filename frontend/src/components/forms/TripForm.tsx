import { useEffect, useState } from "react"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import type { Trip } from "../../types"

type TripFormData = Omit<Trip, "id" | "createdAt" | "updatedAt">

type Props = {
    onSubmit: (data: TripFormData) => void
    onCancel: () => void
    onDelete?: () => void
    initialData?: Trip
    isEditing?: boolean
}

const TripForm = ({
    onSubmit,
    onCancel,
    onDelete,
    initialData,
    isEditing = false,
}: Props) => {
    const [form, setForm] = useState<TripFormData>({
        title: "",
        collaborators: [],
        experiences: [],
        createdBy: "",
        ...initialData,
    })

    // Update form when initialData changes (for editing existing experiences)
    useEffect(() => {
        if (initialData) {
            setForm((prevForm) => ({
                ...prevForm, // Keep current form state as base
                ...initialData, // Override with initialData
            }))
        }
    }, [initialData])

    const handleChange = <K extends keyof TripFormData>(
        field: K,
        value: TripFormData[K]
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                id="title"
                label="Trip Title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
            />
            <div className="flex gap-2">
                <Button
                    type="submit"
                    variant={isEditing ? "update" : "primary"}
                >
                    {isEditing ? "Update Trip" : "Create Trip"}
                </Button>
                <Button type="button" variant="cancel" onClick={onCancel}>
                    Cancel
                </Button>
                {onDelete && (
                    <Button type="button" variant="delete" onClick={onDelete}>
                        Delete Trip
                    </Button>
                )}
            </div>
        </form>
    )
}

export default TripForm
