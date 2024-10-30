import React, { useCallback, useMemo, useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import ListItem from "./ListItem";
import Pagination from "react-js-pagination";
import './List.css';
import Search from '../../UI/Search/Search';
import Filter from '../../UI/Search/Filter';

const List = ({ students, onDelete, onUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1); // state to handle pagination
  const [searchQuery, setSearchQuery] = useState(''); // state ho handle search 
  const [studentInfo, setStudentInfo] = useState(null); // state to manage the student data for update or delete
  const [actionType, setActionType] = useState(null); // state handling if the user wants to update or delete
  const [filter, setFilter] = useState('0');

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }, []);


  const handleAction = useCallback((id, type) => {
    const student = students.find(student => student.id === id);
    if (student) {
      setStudentInfo(student);
      setActionType(type);
    } else {
      console.log(`Student with ID ${id} not found.`);
    }
  }, [students]);

  const handleYesClick = useCallback(async () => {
    if (actionType === 'delete') {
      onDelete(studentInfo.id);
    } else if (actionType === 'update') {
      onUpdate(studentInfo);
    }
    setStudentInfo(null);
    setActionType(null);
  }, [actionType, onDelete, onUpdate, studentInfo]);

  const handleCancelClick = useCallback(() => {
    setStudentInfo(null);
    setActionType(null);
  }, []);

  const filteredStudents = useMemo(() => {
    let filtered = students.filter((item) => {
      switch(filter){
        case '0': return students;
        case '50': return item.score < 50;
        case '70': return item.score > 50 && item.score < 70;
        case '100': return item.score > 70;
        default: return students;
      }
    }).filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (filter === 'new') {
      return filtered.sort((a, b) => new Date(b.dob.birth_date) - new Date(a.dob.birth_date));
    } else if (filter === 'old') {
      return filtered.sort((a, b) => new Date(a.dob.birth_date) - new Date(b.dob.birth_date));
    }else if (filter === 'highest') {
      return filtered.sort((a, b) => b.score - a.score);
    }else if (filter === 'lowest') {
      return filtered.sort((a, b) => a.score - b.score);
    }
  
    return filtered;
  }, [students, filter, searchQuery]);
  

  const recordsPerPage = 6;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);


  return (
    <div className="m-5 new-student mx-auto">
      <Search searchQuery={searchQuery} handleSearch={handleSearch}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} 
      options={[
        {key: 1, name: 'All',  value:'0'}, 
        {key: 2, name: 'C Grade: (0-50)',  value:'50'}, 
        {key: 3, name: 'B Grade: (50-70)', value:'70'}, 
        {key: 4, name: 'A Grade: (70-100)', value:'100'}, 
        {key: 5, name: 'Youngest', value:'new'}, 
        {key: 6, name: 'Oldest', value:'old'}, 
        {key: 7, name: 'Highest-Lowest', value:'highest'}, 
        {key: 8, name: 'Lowest-Highest', value:'lowest'}, 
      ]}/>
      <table className="table student-table">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(data => (
            <tr key={data.id} className="student-row">
              {(studentInfo && actionType === 'update' && data.id === studentInfo.id) ? (
                <>
                  <td>{data.id}</td>
                  <td className='w-20'>{data.dob.birth_date}</td>
                  <td>
                    <input 
                      className='form-control'
                      type="text"                       
                      name="name" 
                      value={studentInfo.name} 
                      onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} 
                      required 
                      pattern='[a-zA-Z]+([\s][a-zA-Z]+)*'
                    />                 
                  </td>
                  <td>
                    <input 
                      className='form-control'
                      type="number" 
                      name="score" 
                      value={studentInfo.score} 
                      onChange={(e) => setStudentInfo({ ...studentInfo, score: e.target.value })} 
                      required 
                    /> 
                  </td>
                  <td className="px-0 new-student__actions w-40">
                    <Button text='Update' onClick={handleYesClick} />
                    <Button text="Cancel" onClick={handleCancelClick} />
                  </td>
                </>
                
              ) : (
                <ListItem 
                  key={data.id} 
                  id = {data.id} 
                  name={data.name} 
                  score={data.score} 
                  dob={data.dob.birth_date}
                  onDelete={() => handleAction(data.id, 'delete')}
                  onUpdate={() => handleAction(data.id, 'update')}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='back-ground-skin text-end'>
        <Pagination
          totalItemsCount={filteredStudents.length}
          activePage={currentPage}
          itemsCountPerPage={recordsPerPage}
          pageRangeDisplayed={5}
          prevPageText='prev'
          firstPageText='First'
          lastPageText='End'
          nextPageText='next'       
          onChange={onPageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>

      {studentInfo && actionType === 'delete' && (
        <Modal onClick={handleCancelClick}>
          <div className="d-block p-3">
              <h5 className='text-center'>Are you sure you want to delete?</h5>         
          </div>
          <div className="d-block d-flex justify-content-end">
            <Button type='button' text='delete' onClick={handleYesClick} />
            <div className='me-2'></div>
            <Button type='button' text='Cancel' onClick={handleCancelClick}/>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default List;
