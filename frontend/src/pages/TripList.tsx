
import type { Trip } from "../types"

type Props = {
    _list: Trip[];
    onDeleteClickHnd: (data: Trip) => void
    onEdit: (data: Trip) => void
}

const TripList = (props: Props) => {
    const { _list, onDeleteClickHnd, onEdit } = props
    return (
        <div>
            <br />
            <table>
              <tbody>
                <tr>
                    <th> Title</th>
                    <th> Actions </th>
                </tr>
                { _list.map((t) => {
                    return (
                        <tr key={t.id}>
                            <td>{t.title}</td>
                            <td>
                                <div>
                                    <input type="button" value="Edit" onClick={()=> onEdit(t)} />
                                    &nbsp;
                                    <input type="button" value="Delete" onClick={() => onDeleteClickHnd(t)} />
                                </div>
                            </td>
                        </tr>
                    )
                })}
              </tbody>  
            </table>
        </div>
    )
}

export default TripList
