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
import { CSVLink, CSVDownload } from "react-csv";



const  TableUsers = (props) => {

    const [listUsers, setlistUsers] = useState([]);
    const [totalUsers, setTotallUsesrs] = useState(0);
    const [totalPages, setTotallPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})
    
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

     const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return (<>
      <div className='my-3 add-new'>
         <span><b>List users:</b></span> 
         <div className='group-btns'>
          <label htmlFor='Test' className='btn btn-warning'>
          <FontAwesomeIcon icon={faFileArrowUp} /> Import
          </label>
          <input id='Test' type='file' hidden/>
          
         <CSVLink data={listUsers}
           filename={"my-file.csv"}
           className="btn btn-primary"
           target="_blank"
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