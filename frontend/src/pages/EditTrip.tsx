//Reference: https://www.youtube.com/watch?v=R1uTPIOuT8s  React simple CRUD Application

import { useId, useState } from "react";
import type { Trip } from "../types"
import { mockExperiences } from "../assets/experiences";

type Props = {
  onCancelBtnClickHnd: () => void;
  onUpdateClickHnd: (data: Trip) => void
};

const EditTrip = (props: Props) => {
 
const [title, setTitle] = useState("");
const [id, _setId] = useState("");
const [userId, _setUserId] = useState("");

const { onCancelBtnClickHnd, onUpdateClickHnd} = props;

const onTitleChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTitle(e.target.value)
}


const onEditBtnClickHnd = (e: React.MouseEvent<HTMLFormElement>) => {
  e.preventDefault();
  const updatedData: Trip = {
    id: id,
    userId: userId,
    title: title,
    experiences: mockExperiences
  }
  onUpdateClickHnd(updatedData);
  onCancelBtnClickHnd();
}

  return (
  <>
    <form onSubmit={onEditBtnClickHnd}>
      <div>
        <h3>Edit Trip Form</h3>
        <label>Title: </label>
        <input style={{ width: '300px' }} type = "text"  name="title" id="title" value={title} onChange={onTitleChangeHnd} required />
      </div>
        <br/>
      <div>
        <input type = "button" value = "Cancel" onClick={onCancelBtnClickHnd} />
        &nbsp;
        <input type = "submit" value = "Edit Trip"/>   
      </div>  
    </form>   
  </>
  )
};

export default EditTrip;
