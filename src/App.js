import { Container } from 'react-bootstrap';
import '../src/App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';


function App() {
  return (
    <>
    <div className='app-container'>
      
        <Header />
        <Container>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<TableUsers />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>
     
    </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
  </>
  );
}

export default App
