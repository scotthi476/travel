//Reference: https://www.youtube.com/watch?v=R1uTPIOuT8s  React simple CRUD Application

type Props = {
  onCancelBtnClickHnd: () => void;
};

const AddTrip = (props: Props) => {

const { onCancelBtnClickHnd } = props

  return (
  <>
    <form>
      <div>
        <label>Title: </label>
        <input style={{ width: '300px' }} type = "text"  name="title" id="title"  required />
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