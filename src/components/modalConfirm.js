import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalConfirm = (props) => {
    const {show, handleClose} = props;
 
    const confirmDelete = () => {

    }
    return (
        <>
        <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='body-add-new'>
          dhfsrh
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> confirmDelete()}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
          </>
      );
}

export default ModalConfirm;