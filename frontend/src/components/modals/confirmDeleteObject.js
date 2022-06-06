import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

function Example(props) {
  const [show, setShow] = useState(false);

    const objectId = props.objectId
    const objectName = props.objectName


  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const deleteObject = () => {
    props.deleteObject(objectId)
    setShow(false)
  }

  return (
    <>
      <button type="button" onClick={handleShow} className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrashCan} /></button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Удаление проекта  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Вы уверены, что хотите удалить проект под названием " {objectName} "
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteObject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example