import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

function Example(props) {
  const [show, setShow] = useState(false);

    const modelId = props.modelId
    const modelName = props.modelName

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const deleteModel = () => {
    props.deleteModel(modelId)
    setShow(false)
  }

  return (
    <>
      <button type="button" onClick={handleShow} className="btn btn-outline-danger"><FontAwesomeIcon icon={faTrashCan} /></button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Удаление модели </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Вы уверены, что хотите удалить модель под названием " {modelName} "
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteModel}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example