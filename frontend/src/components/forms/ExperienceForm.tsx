// Followed guide to create form: https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3

import { useEffect, useState } from "react"
import TextInput from "../ui/TextInput"
import Textarea from "../ui/Textarea"
import ImageUpload from "../ui/ImageUpload"
import GeoInput from "../ui/GeoInput"
import RatingInput from "../ui/RatingInput"
import KeywordInput from "../ui/KeywordInput"
import Button from "../ui/Button"
import DatePicker from "../ui/DatePicker"
import type { Experience } from "../../types"

type ExperienceFormData = Omit<Experience, "id" | "createdAt" | "updatedAt">

type Props = {
    onSubmit: (data: ExperienceFormData) => void
    onDelete?: (experience: Experience) => void
    onCancel?: () => void
    initialData?: Experience
    isEditing?: boolean
    isLoading?: boolean
    experience?: Experience | null
}

const ExperienceForm = ({
    onSubmit,
    onDelete,
    onCancel,
    initialData,
    isEditing = false,
    isLoading = false,
    experience,
}: Props) => {
    const [form, setForm] = useState<ExperienceFormData>({
        title: "",
        description: "",
        createdBy: "",
        imageUrl: "",
        date: "",
        rating: 1,
        latitude: 0,
        longitude: 0,
        isPublic: true,
        keywords: [],
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

    const handleChange = <K extends keyof ExperienceFormData>(
        field: K,
        value: ExperienceFormData[K]
    ) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoading) {
            onSubmit(form)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
                id="title"
                label="Title"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
            />

            <Textarea
                id="description"
                label="Description"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
            />

            <ImageUpload
                label="Image URL"
                url={form.imageUrl}
                onChange={(url) => handleChange("imageUrl", url)}
            />

            <DatePicker
                id="date"
                label="Date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
            />

            <RatingInput
                label="Rating"
                value={form.rating ?? 1}
                onChange={(value) => handleChange("rating", value)}
            />

            <GeoInput
                lat={form.latitude}
                lng={form.longitude}
                onChange={(lat, lng) => {
                    handleChange("latitude", lat ?? 0)
                    handleChange("longitude", lng ?? 0)
                }}
                required
            />

            <div className="flex items-center gap-2">
                <label htmlFor="isPublic">Public?</label>
                <input
                    id="isPublic"
                    type="checkbox"
                    checked={form.isPublic}
                    onChange={(e) => handleChange("isPublic", e.target.checked)}
                />
            </div>

            <KeywordInput
                label="Keywords"
                value={form.keywords ?? []}
                onChange={(kws) => handleChange("keywords", kws)}
            />

            <div className="flex gap-2">
                <Button type="submit">
                    {isLoading
                        ? isEditing
                            ? "Updating..."
                            : "Creating..."
                        : isEditing
                        ? "Update"
                        : "Create"}
                </Button>

                {isEditing && onDelete && experience && (
                    <Button
                        type="button"
                        variant="delete"
                        onClick={() => onDelete(experience)}
                    >
                        Delete
                    </Button>
                )}
                {isEditing && (
                    <Button type="button" variant="cancel" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    )
}

export default ExperienceForm
