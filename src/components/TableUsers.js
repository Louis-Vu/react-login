import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddnew from './ModalAdmin';
import ModalEdit from './ModalEdit';

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

    useEffect(()=> {
        getUsers(1);
            }, []);

     const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if(res && res.data ) {
          console.log(res)
            setTotallUsesrs(res.total)
            setlistUsers(res.data)
            setTotallPages(res.total_pages)
        }

     }      
     console.log (listUsers);

     const handlePageClick = (event) => {
        getUsers(+event.selected +1)
     }

    return (<>
      <div className='my-3 add-new'>
         <span><b>List users:</b></span> 
          <button className='btn btn-success'
          onClick={() => setIsShowModalAddNew(true)}>Add New user</button>
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
        <tr key={'users-${index}'}>
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
      />
    </>)
}

export default TableUsers;