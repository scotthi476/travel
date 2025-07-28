import { useState } from "react"
import TextInput from "../ui/TextInput"
import Button from "../ui/Button"
import type { TripFormData } from "../../types"

type Props = {
    onSubmit: (data: TripFormData) => void
    onCancel: () => void
    initialData?: TripFormData
    isEditing?: boolean
}

const TripForm = ({
    onSubmit,
    onCancel,
    initialData,
    isEditing = false,
}: Props) => {
    const [title, setTitle] = useState(initialData?.title ?? "")
    const [experiences] = useState(initialData?.experiences ?? [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ title, experiences })
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                id="trip-title"
                label="Trip Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4">
                <Button type="button" variant="cancel" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant={isEditing ? "update" : "primary"}
                >
                    {isEditing ? "Update Trip" : "Create Trip"}
                </Button>
            </div>
        </form>
    )
}

export default TripForm
