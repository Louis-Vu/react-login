import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';

const ModalAddnew = (props) => {
    const {show, handleClose} = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
      let res = await postCreateUser(name, job);
      console.log(">>> check res: ", res);
      if(res && res.id){
        handleClose();
        setName('');
        setJob('');
      }else{

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
                  <label className="form-label">Name</label>
                  <input type="Text" className="form-control" value={name}
                  onChange={(event)=> setName(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Job</label>
                  <input type="text" class="form-control" value={job}
                  onChange={(event)=> setJob(event.target.value)}/>
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