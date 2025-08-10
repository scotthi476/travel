import Button from "../components/ui/Button"
import type { Trip } from "../types"

type Props = {
    list: Trip[]
    onDeleteClickHnd: (data: Trip) => void
    onEdit: (data: Trip) => void
    onSelect?: (data: Trip) => void
    selectedTripId?: string
}

const TripList = (props: Props) => {
    const { list, onDeleteClickHnd, onSelect, selectedTripId, onEdit } = props
    return (
        <div className="mt-4">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-700 border-b border-gray-200">
                            Title
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700 border-b border-gray-200">
                            Experiences
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-gray-700 border-b border-gray-200">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((t) => (
                        <tr
                            key={t.id}
                            className={`border-t cursor-pointer hover:bg-gray-50 ${
                                selectedTripId === t.id
                                    ? "bg-emerald-50 border-emerald-400"
                                    : ""
                            }`}
                            onClick={() => onSelect?.(t)}
                        >
                            <td className="px-4 py-3 text-gray-900">
                                {t.title}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                                {t.experiences?.length || 0}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex gap-2">
                                    <Button
                                        variant="update"
                                        onClick={() => onEdit(t)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="delete"
                                        onClick={() => onDeleteClickHnd(t)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TripList
