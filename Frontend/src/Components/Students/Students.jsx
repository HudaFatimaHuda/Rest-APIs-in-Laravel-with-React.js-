import React, { useState } from "react";
import List from './List/List';
import NewStudent from "./NewStudent/NewStudent";
import { Form, useLoaderData } from "react-router-dom";

const Students = () => {
  const data = useLoaderData();
  const [students, setStudents] = useState(data);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleDelete = async(id) => {
    const token = localStorage.getItem('token'); 
    const response = await fetch('http://localhost:8000/api/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    const responseData = await response.json();

    if(!response.ok) {
      setMessage(responseData.message);
      setTimeout(() => {setMessage('');}, 5000); 
      return
    }
    setMessage(responseData.message);
    // Refetch students after delete action is completed
    const updatedData = responseData.data;
    setStudents(updatedData);
    setTimeout(() => {setMessage('');}, 5000); // = 5 seconds)
  }

  const handleUpdate = async(data) => {
    const token = localStorage.getItem('token'); 
    const response = await fetch('http://localhost:8000/api/users/' + data.id, {
      method: 'PUT',
      body: JSON.stringify({
        name: data.name, 
        score: data.score,
        dob: data.dob.birth_date
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    const responseData = await response.json();
    
    if(!response.ok) {
      setMessage(responseData.message);
      setTimeout(() => {setMessage('');}, 5000); 
      return
    }

    // if (!response.ok) {
    //   throw new Error('Something went wrong!');
    // }

    setMessage(responseData.message);
    // Refetch students after add action is completed
    const updatedData = responseData.data;
    setStudents(updatedData);
    setTimeout(() => {setMessage('');}, 5000); 
  }

  const handleAdd = async(data) => {

    const token = localStorage.getItem('token'); 

    const response = await fetch('http://localhost:8000/api/users' , {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    const responseData = await response.json();
    
    if(!response.ok) {
      setMessage(responseData.message);
      setTimeout(() => {setMessage('');}, 5000); 
      return
    }

    // if (!response.ok) {
    //   throw new Error('Something went wrong!');
    // }

    setMessage(responseData.message);
    // Refetch students after add action is completed
    const updatedData = responseData.data;
    setStudents(updatedData);
    setTimeout(() => {setMessage('');}, 5000); 
  }


  return (
  <>
   {token && <>
    <Form action="/logout" method="POST" className="new-student logout-form">
        <button className="ms-auto" type='submit'>Logout</button>
    </Form>
    <NewStudent onAddStudent={handleAdd}/>
   </>}
    {message && <div className="alert new-student mx-auto" role="alert">{message}</div>}
    {token && ((students && students.length > 0) ? 
      <List students={students} onDelete = {handleDelete} onUpdate={handleUpdate}/>
      :
      <div className='container mt-5 new-student'><p>No data found</p></div>
    )}

  </>)
};

export default Students;
