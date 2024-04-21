import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddnew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import _ from "lodash";
import '../components/TableUsers.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileArrowDown, faFileArrowUp } from '@fortawesome/free-solid-svg-icons'; 
import { CSVLink } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify'; 


const  TableUsers = (props) => {

    const [listUsers, setlistUsers] = useState([]);
    const [totalUsers, setTotallUsesrs] = useState(0);
    const [totalPages, setTotallPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [ dataExport, setDataExport ] = useState([]);
    
    const handleClose = () =>{
      setIsShowModalAddNew(false);
      setIsShowModalEdit(false);
    };

    const handleEditUser = (user) =>{
      setDataUserEdit(user);
      setIsShowModalEdit(true);
    }


    const handleUpdateTable = (user) => {
      setlistUsers([ user, ...listUsers ]);

    }

    const handleEditUsers = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      let index = listUsers.findIndex(item => item.id === user.id);
      cloneListUsers[index].first_name = user.first_name;
      cloneListUsers[index].last_name = user.last_name;
      cloneListUsers[index].email = user.email;

      setlistUsers(cloneListUsers);
    }

    useEffect(()=> {
        getUsers(1);
            }, []);

     const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if(res && res.data ) {
            setTotallUsesrs(res.total);
            setlistUsers(res.data);
            setTotallPages(res.total_pages);
        }

     }      

     const handlePageClick = (event) => {
        getUsers(+event.selected +1)
     }

    const getUsersExport = (event, done) => {
      let result = [];
      if(listUsers &&  listUsers.length > 0){
        result.push(["ID", "Email", "First name", "Last name"]);
        listUsers.map((item, index ) => {
          let arr = [];
          arr[0] =item.id;
          arr[1] =item.email;
          arr[2] =item.first_name;
          arr[3] =item.last_name;
          result.push(arr);
        })
        setDataExport(result);
        done();
      }
    }

    const handleImportCSV = (event) => {
      let file = event.target.files[0];
        if (file.type !== "text/csv") {
          toast.error("Only accept csv file....");
          return;
        }

      // Parse local CSV file
      Papa.parse(file, {
        // header: true,
        complete: function(results) {
          let rawCSV = results.data;
          if(rawCSV.length > 0){
            if(rawCSV[0] && rawCSV[0].length === 3){
              if(rawCSV[0][0] !== "email"
            || rawCSV[0][1] !== "first_name"
            || rawCSV[0][2] !== "last_name"
            ){
              toast.error("wrong format header CSV file!")
            } else {
              let result = [];

              rawCSV.map((item, index) =>{
                if(index > 0 && item.length === 3){
                  let obj = {};
                  obj.email = item[0]
                  obj.first_name = item[1]
                  obj.last_name = item[2]
                  result.push(obj);

                }
              })
              setlistUsers(result)
              console.log(">>> check:", result)
            }

            }else{
              toast.error("wrong format CSV file!")
            }

          }else
          toast.error("Not fought data on CSV file!")
      
          }
});

    }

    return (<>
      <div className='my-3 add-new'>
         <span><b>List users:</b></span> 
         <div className='group-btns'>
          <label htmlFor='Test' className='btn btn-warning'>
          <FontAwesomeIcon icon={faFileArrowUp} /> Import
          </label>
          <input id='Test' type='file' hidden
          onChange={(event) => handleImportCSV(event)}
          />
          
         <CSVLink data={dataExport}
           filename={"my-file.csv"}
           className="btn btn-primary"
           asyncOnClick={true}
           onClick={getUsersExport}
         ><FontAwesomeIcon icon={faFileArrowDown} />  Export</CSVLink>


          <button className='btn btn-success'
            onClick={() => setIsShowModalAddNew(true)}>
            <FontAwesomeIcon icon={faUserPlus} />
            Add New</button>

         </div>
         
        </div>
    
    <Table striped bordered hover>
      <thead>
        <tr>

          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 &&

listUsers.map((item, index) => {
    return (
        <tr key={`users-${index}`}>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>
            <button className='btn btn-warning mx-3 '
            onClick = {() => handleEditUser(item)}>Edit</button>
            <button className='btn btn-danger'>Delete</button>
          </td>
        </tr>
    )
}) 
        }
        
        
      </tbody>
    </Table>

    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"  

        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"

      />
 <ModalAddnew
         show = {isShowModalAddNew}
         handleClose={handleClose}
         handleUpdateTable = {handleUpdateTable}
      />
      <ModalEdit
        show ={isShowModalEdit}
        dataUserEdit = {dataUserEdit}
        handleClose={handleClose}
        handleEditUsers = {handleEditUsers}

      />
    </>)
}

export default TableUsers;