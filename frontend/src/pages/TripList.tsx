import { mockTripList } from "../assets/trips"
import type { Trip } from "../types"

type Props = {
    _list: Trip[]
}

const TripList = (props: Props) => {
    const { _list } = props
    return (
        <div>
            <br />
            <table>
                <tr>
                    <th> Title</th>
                    <th> Actions </th>
                </tr>
                {mockTripList.map((t) => {
                    return (
                        <tr key={t.id}>
                            <td>{t.title}</td>
                            <td>
                                <div>
                                    <input type="button" value="Update" />
                                    &nbsp;
                                    <input type="button" value="Delete" />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default TripList
