//Reference: https://www.youtube.com/watch?v=R1uTPIOuT8s  React simple CRUD Application

import type { Trip } from "../types"
import { mockExperiences } from "../assets/experiences";
import { useState } from "react";

type Props = {
  onCancelBtnClickHnd: () => void;
  onSubmitHnd: (data: Trip) => void
};

const AddTrip = (props: Props) => {

const [title, setTitle] = useState("");
const [id, setId] = useState("");
const [userId, setUserId] = useState("");

const { onCancelBtnClickHnd, onSubmitHnd} = props;

const onTitleChangeHnd = (e: any) => {
  setTitle(e.target.value)
}

const onAddBtnClickHnd = (e: any) => {
  e.preventDefault();
  const data: Trip = {
    id: id,
    userId: userId,
    title: title,
    experiences: mockExperiences
  }
  onSubmitHnd(data);
  onCancelBtnClickHnd();
}

  return (
  <>
    <form onSubmit={onAddBtnClickHnd}>
      <div>
        <label>Title: </label>
        <input style={{ width: '300px' }} type = "text"  name="title" id="title" value={title} onChange={onTitleChangeHnd} required />
      </div>
        <br/>
      <div>
        <input type = "button" value = "Cancel" onClick={onCancelBtnClickHnd} />
        &nbsp;
        <input type = "submit" value = "Submit"/>   
      </div>  
    </form>   
  </>
  )
};

export default AddTrip;