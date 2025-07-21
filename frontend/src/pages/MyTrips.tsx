import { useState } from "react"
import type { Trip } from "../types"
import { mockTripList } from "../assets/trips.ts"
import "./TripList.tsx"
import TripList from "./TripList.tsx"
import "./AddTrip.tsx"
import AddTrip from "./AddTrip.tsx"
import EditTrip from "./EditTrip.tsx"
import "../App.css"

// TODO: Hisami add form for CRUD operation
//Reference : https://www.youtube.com/watch?v=R1uTPIOuT8s React Simple CRUD Application

const MyTrips = () => {
    const [tripList, _setTripList] = useState(mockTripList as Trip[])

    const [displayPage, setDisplayPage] = useState("list");
    const [dataToEdit, setDataToEdit] = useState({} as null| Trip);

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

    const editEmployeeData = (data: Trip) =>{
        setDisplayPage("edit");
        setDataToEdit(data);
    }

    const updateData = (data: Trip) => {
       const filteredData = tripList.filter(x => x.id === data.id)[0];
       const indexOfRecord = tripList.indexOf(filteredData);
       const tempdata = [...tripList] 
       tempdata[indexOfRecord] = data;
       _setTripList(tempdata);
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
                        <TripList _list={tripList} onDeleteClickHnd={deleteTrip} onEdit={editEmployeeData}/>
                    </>
                )}
                {displayPage === "add" && (
                    <AddTrip onCancelBtnClickHnd={showListPage} onSubmitHnd={addTrip} />
                )}
                {displayPage === "edit" && <EditTrip  onCancelBtnClickHnd={showListPage} onUpdateClickHnd={updateData}/>}
            </section>
        </>
    )
}

export default MyTrips
