import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalAddnew = (props) => {
    const {show, handleClose, handleUpdateTable} = props;
    const [lastname, setlastname] = useState("")
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [email, setEmail] = useState("")

    const handleSaveUser = async () => {
      let res = await postCreateUser(lastname, name, job, email);
      console.log(">>> check res: ", res);
      if(res && res.id){
        handleClose();
        setlastname('')
        setName('');
        setJob('');
        setEmail('')
        toast.success(" Users is created success! ");
        handleUpdateTable({ last_name: lastname, first_name: name, id: res.id, email: email});
      }else{
        toast.error("An Users....")
      }
    }
    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
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
          <Button variant="primary" onClick={()=> handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
          </>
      );
}

export default ModalAddnew;