import { Container } from 'react-bootstrap';
import '../src/App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import ModalAddnew from './components/ModalAdmin';
import { useState } from 'react';

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () =>{
    setIsShowModalAddNew(false);

  }
  return (
    <div className='app-container'>
      
        <Header />
        <Container>
        <div className='my-3 add-new'>
         <span><b>List users:</b></span> 
          <button className='btn btn-success'
          onClick={()=> setIsShowModalAddNew(true)}>Add New user</button>
        </div>
        <TableUsers />

        </Container>
      <ModalAddnew
         show = {isShowModalAddNew}
         handleClose={handleClose}
      />
      

    </div>
  );
}

export default App;
