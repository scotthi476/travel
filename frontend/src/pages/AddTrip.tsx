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
const [id, _setId] = useState("");
const [userId, _setUserId] = useState("");

const { onCancelBtnClickHnd, onSubmitHnd} = props;

const onTitleChangeHnd = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTitle(e.target.value)
}

const onAddBtnClickHnd = (e: React.MouseEvent<HTMLFormElement>) => {
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
