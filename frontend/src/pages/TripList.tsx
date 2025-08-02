import Button from "../components/ui/Button"
import type { Trip } from "../types"

type Props = {
    list: Trip[]
    onDeleteClickHnd: (data: Trip) => void
    onEdit: (data: Trip) => void
}

const TripList = (props: Props) => {
    const { list, onDeleteClickHnd, onEdit } = props
    return (
        <div className="mt-4">
            <table className="w-full border border-collapse">
                <thead>
                    <tr>
                        <th className="text-left border-b pb-2">Title</th>
                        <th className="text-left border-b pb-2">Experiences</th>
                        <th className="text-left border-b pb-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((t) => (
                        <tr key={t.id} className="border-t">
                            <td className="py-2">{t.title}</td>
                            <td className="py-2">
                                {t.experiences?.length || 0}
                            </td>
                            <td className="py-2">
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
