import { useState } from "react";
import "./MyTrips.css";
import type { Trip } from "../types"
import { mockTripList } from "../assets/trips"
import "./TripList"
import TripList from "./TripList";
import "./AddTrip.tsx";
import AddTrip from "./AddTrip.tsx";

// TODO: Hisami add form for CRUD operation
//Reference : https://www.youtube.com/watch?v=R1uTPIOuT8s React Simple CRUD Application
 
const MyTrips = () => {
    const [tripList, setTripList] = useState(mockTripList as Trip[]);

    const [displayPage, setDisplayPage] = useState('list');

    const onAddTripClickHnd = () => {
      setDisplayPage('add');
    };

    const showListPage = () => {
      setDisplayPage('list');
    };

    return (
    <> 
      <div>
            <br/>
            <h1>My Trips</h1>
            <br/>
      </div>
      <section>
        {displayPage === 'list' && (
        <>  
        <input type = "button" value = "Add Trip" onClick={onAddTripClickHnd}/>
        <TripList list={tripList}/>
        </>
      )}
      {displayPage === 'add' && <AddTrip onCancelBtnClickHnd={showListPage} /> }  
      </section>      
     </>     
    ); 
};

export default MyTrips
