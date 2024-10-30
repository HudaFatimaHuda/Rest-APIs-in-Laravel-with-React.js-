import React, {useState} from "react";
import "./NewStudent.css";
import StudentForm from "./StudentForm";

const NewStudent = (props) => {
  /*states for handling the click of user*/
  const [isActive, setIsActive] = useState(true);
  const handleClick = event => {setIsActive(current => !current);};

  /*two way binding for handling the entered data from student form*/
  const saveStudentDataHandler = (enteredStudentData) => {
    props.onAddStudent(enteredStudentData);
  }

  return (
      <div className='new-student'>
        {isActive ?
        (<button onClick = {handleClick}>Add New Student</button>) :
        (<StudentForm onSaveStudentData = {saveStudentDataHandler} onclickHandle = {handleClick}/>)
      }
      </div>
    );

}

export default NewStudent;
