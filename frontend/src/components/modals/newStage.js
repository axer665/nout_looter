import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function NewStage(props) {
    const [show, setShow] = useState(false);
    const [newName, setName] = useState('');
    const [newShortName, setShortName] = useState('');
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
  const setShortNameMethod = (event) => {
    setShortName(event.target.value)
  }

  const createProject = () => {
    if (!newName){
        addInformerMethod('Поле "Наименование полное" не может быть пустым')
    } else if (!newShortName) {
        addInformerMethod('Поле "Наименование краткое" не может быть пустым')
    } else {
        props.addStage({'name': newName, 'shortName': newShortName})
        //addInformerMethod('Этап создан')
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
    console.log(item)
  }

  return (
    <>
      <div className="block-add_item">
          <div className="button-add button_add_project" onClick={handleShow}>
              Добавить +
          </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Создание раздела </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table-create">
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            Наименование полное
                        </td>
                        <td>
                            <input type="text" onChange={setNameMethod} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Наименование краткое
                        </td>
                        <td>
                            <input type="text" onChange={setShortNameMethod} />
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

export default NewStage