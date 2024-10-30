import React, {useState} from "react";
import "./StudentForm.css";

const StudentForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredScore, setEnteredScore] = useState("");
  const [enteredDate, setEnteredDate] = useState('');

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  }

  const scoreChangeHandler = (event) => {
    setEnteredScore(event.target.value);
  }

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const studentData = {
      name: enteredName,
      score: enteredScore,
      dob: enteredDate,
    };
    // console.log(studentData);
    props.onSaveStudentData(studentData);
    setEnteredName('');
    setEnteredScore('');
    setEnteredName('');
    props.onclickHandle()
  }

  return(
    <form onSubmit = {submitHandler}>
      <div className='new-student__controls'>
        <div className='new-student__control'>
          <label>Name</label>
          <input type='text' name='name' value = {enteredName} onChange={nameChangeHandler} required pattern='[a-zA-Z]+([\s][a-zA-Z]+)*'/>
        </div>
        <div className='new-student__control'>
          <label>Score</label>
          <input type='number' min='0' max='100' value = {enteredScore} onChange={scoreChangeHandler} required/>
        </div>
        <div className='new-student__control'>
          <label>Date of Birth</label>
          <input type='date' min='2019-01-01' max='2022-12-31' value = {enteredDate} onChange={dateChangeHandler} required/>
        </div>
      </div>
      <div className='new-student__actions'>
        <button onClick = {props.onclickHandle}>Cancel</button>
        <button type='submit'>Add Student</button>
      </div>
    </form>
  )
}

export default StudentForm;
