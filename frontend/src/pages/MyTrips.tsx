import { useState } from "react"
import "./MyTrips.css"
import type { Trip } from "../types"
import { mockTripList } from "../assets/trips.ts"
import "./TripList.tsx"
import TripList from "./TripList.tsx"
import "./AddTrip.tsx"
import AddTrip from "./AddTrip.tsx"

// TODO: Hisami add form for CRUD operation
//Reference : https://www.youtube.com/watch?v=R1uTPIOuT8s React Simple CRUD Application

const MyTrips = () => {
    const [tripList, _setTripList] = useState(mockTripList as Trip[])

    const [displayPage, setDisplayPage] = useState("list")

    const onAddTripClickHnd = () => {
        setDisplayPage("add")
    }

    const showListPage = () => {
        setDisplayPage("list")
    }

    const addTrip = (data: Trip) => {
       _setTripList([...tripList, data]);
    }

    const deleteTrip = (data: Trip) =>{
      const indexToDelete = tripList.indexOf(data);
      const tempList = [...tripList]

      tempList.splice(indexToDelete,1);
      _setTripList(tempList);      
    }

    return (
        <>
            <div>
                <br />
                <h1>My Trips</h1>
                <br />
            </div>
            <section>
                {displayPage === "list" && (
                    <>
                        <input
                            type="button"
                            value="Add Trip"
                            onClick={onAddTripClickHnd}
                        />
                        <TripList _list={tripList} onDeleteClickHnd={deleteTrip}/>
                    </>
                )}
                {displayPage === "add" && (
                    <AddTrip onCancelBtnClickHnd={showListPage} onSubmitClickHnd={addTrip} />
                )}
            </section>
        </>
    )
}

export default MyTrips
