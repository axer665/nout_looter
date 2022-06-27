import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function Example(props) {
    const [show, setShow] = useState(false);
    const [newProjectCode, setProjectCode] = useState('');
    const [newProjectName, setProjectName] = useState('');
    const [informers, addInformer] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const deleteProject = () => {
      setShow(false)
  }

  const setName = (event) => {
    setProjectName(event.target.value)
  }
  const setCode = (event) => {
    setProjectCode(event.target.value)
  }

  const createProject = () => {
    if (!newProjectCode){
        addInformerMethod('Поле "Шифр" не может быть пустым')
    } else if (!newProjectName) {
        addInformerMethod('Поле "Наименование" не может быть пустым')
    } else {
        props.addProject({'name': newProjectName, 'code': newProjectCode})
        addInformerMethod('Проект под шифром '+newProjectCode+' с наименованием '+newProjectName+' создан')
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
          <div className="button-add button_add_project" onClick={handleShow}>
              Добавить +
          </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Создание проекта </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table-create">
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            Шифр
                        </td>
                        <td>
                            <input type="text" onChange={setCode} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Наименование
                        </td>
                        <td>
                            <input type="text" onChange={setName} />
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