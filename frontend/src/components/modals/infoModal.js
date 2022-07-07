import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

function Example(props) {
  const [show, setShow] = useState(false);

    const projectId = props.projectId
    const projectName = props.projectName
    const projectCode = props.projectCode

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const deleteProject = () => {
      props.deleteProject(projectId)
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
            Вы уверены, что хотите удалить проект под названием " {projectName} " с кодом " {projectCode} "
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example