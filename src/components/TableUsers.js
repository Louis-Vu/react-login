import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';

const  TableUsers = (props) => {

    const [listUsers, setlistUsers] = useState([]);
    const [totalUsers, setTotallUsesrs] = useState(0);
    const [totalPages, setTotallPages] = useState(0);

    useEffect(()=> {
        getUsers(2);
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

     const handlePageClick = () => {
      
     }

    return (<>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          
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


    </>)
}

export default TableUsers;