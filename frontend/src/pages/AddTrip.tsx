//Reference: https://www.youtube.com/watch?v=R1uTPIOuT8s  React simple CRUD Application

import { useId, useState } from "react";
import type { Trip } from "../types"
import { mockExperiences } from "../assets/experiences";

type Props = {
  onCancelBtnClickHnd: () => void;
  onSubmitClickHnd: (data: Trip) => void
};

const AddTrip = (props: Props) => {

const [title, setTitle] = useState("");
const [id, setId] = useState("");
const [userId, setUserId] = useState("");

const { onCancelBtnClickHnd, onSubmitClickHnd} = props;

const onTitleChangeHnd = (e: any) => {
  setTitle(e.target.value)
}


const onSubmitBtnClickHnd = (e: any) => {
  e.preventDefault();
  const data: Trip = {
    id: id,
    userId: userId,
    title: title,
    experiences: mockExperiences
  }
  onSubmitClickHnd(data);
  onCancelBtnClickHnd();

}

  return (
  <>
    <form onSubmit={onSubmitBtnClickHnd}>
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