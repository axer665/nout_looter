import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function Example(props) {
    const [show, setShow] = useState(false);
    const [newObjectType, setObjectType] = useState(0);
    const [newObjectName, setObjectName] = useState('');
    const [informers, addInformer] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const setName = (event) => {
    setObjectName(event.target.value)
  }
  const setType = (event) => {
    setObjectType(event.target.value)
  }

  const createObject = () => {
    if (!newObjectType){
        addInformerMethod('Не указан тип объекта')
    } else if (!newObjectName) {
        addInformerMethod('Поле "Наименование" не может быть пустым')
    } else {
        props.addObject({'name': newObjectName, 'type': newObjectType})
        addInformerMethod('Объект типа '+ newObjectType +' с наименованием '+newObjectName+' создан')
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

  let selectTypes = (
      <select defaultValue="0" onChange={setType}>
          <option value="0" disabled> Не выбрано </option>
          {props.typeOptions}
      </select>
  )

  return (
    <>
      <div className="block-add_item">
          <div className="button-add button_add_project" onClick={handleShow}>
              Добавить +
          </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Создание объекта </Modal.Title>
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
                            <input type="text" onChange={setName} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Тип объекта
                        </td>
                        <td>
                            {selectTypes}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={createObject}>
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