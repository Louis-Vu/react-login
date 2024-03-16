import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalEdit = (props) => {
    const {show, handleClose, dataUserEdit} = props;
    const [lastname, setlastname] = useState("")
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [email, setEmail] = useState("")

    const handleEditUser = () =>{

    }
    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
            setlastname(dataUserEdit.last_name)
            setEmail(dataUserEdit.email)
        }
    }, [dataUserEdit])

    console.log(">>> check props: ", dataUserEdit)
    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
            <div>
            <div class="mb-3">
                  <label className="form-label">Last Name</label>
                  <input type="Text" className="form-control" value={lastname}
                  onChange={(event)=> setlastname(event.target.value)} />
                  </div>
                <div class="mb-3">
                  <label className="form-label">First Name</label>
                  <input type="Text" className="form-control" value={name}
                  onChange={(event)=> setName(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Job</label>
                  <input type="text" class="form-control" value={job}
                  onChange={(event)=> setJob(event.target.value)}/>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email}
                onChange={(event)=> setEmail(event.target.value)} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
          </>
      );
}

export default ModalEdit;