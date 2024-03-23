import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';



const ModalEdit = (props) => {
    const {show, handleClose, dataUserEdit, handleEditUsers} = props;
    const [lastname, setlastname] = useState("")
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [email, setEmail] = useState("")

    const handleEditUser = async () =>{
      let res = await putUpdateUser(name, job);
      console.log("check", res)

      if (res && res.updatedAt) {
        handleEditUsers({
          last_name: lastname ,
          first_name: name,
          id: dataUserEdit.id,
          email: email,

        })

        handleClose();
        toast.success("Update user succeed")
      }
    }
    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
            setlastname(dataUserEdit.last_name)
            setEmail(dataUserEdit.email)
        }
    }, [dataUserEdit])

    return (
      <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>Edit a User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='body-add-new'>
          <div>
          <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="Text" className="form-control" value={lastname}
                onChange={(event)=> setlastname(event.target.value)} />
                </div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type="Text" className="form-control" value={name}
                onChange={(event)=> setName(event.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Job</label>
                <input type="text" className="form-control" value={job}
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
        </>
    );
}

export default ModalEdit;