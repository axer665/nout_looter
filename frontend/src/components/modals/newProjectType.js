import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function Example(props) {
    const [show, setShow] = useState(false);
    const [newName, setName] = useState('');
    const [informers, addInformer] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const deleteProject = () => {
      setShow(false)
  }

  const setNameMethod = (event) => {
    setName(event.target.value)
  }

  const createProject = () => {
    if (!newName){
        addInformerMethod('Поле "Наименование" не может быть пустым')
    } else {
        props.addProjectType({'name': newName})
        //addInformerMethod('Тип объекта создан')
        setShow(false)
    }
  }

  const addInformerMethod = (message) => {
      let messageArray = []
      informers.filter(message => {
          messageArray.push(message)
      })
      messageArray.push(message)
      addInformer(messageArray)
  }

  const updateStatus = (item) => {

  }

  return (
    <>
      <div className="block-add_item">
          <div className="button-add button_add_project btn btn-primary" onClick={handleShow}>
              Добавить +
          </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Создание стадии </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table-create">
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            Наименование
                        </td>
                        <td>
                            <input type="text" onChange={setNameMethod} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={createProject}>
            Создать
          </Button>
        </Modal.Footer>
      </Modal>

      {informers.map(
          (informer, key) => {
              return (<Informer key={key} message={informer} updateStatus={updateStatus} />)
          }
      )}
    </>
  );
}

export default Example