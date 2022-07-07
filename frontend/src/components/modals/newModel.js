import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function Example(props) {
    const [show, setShow] = useState(false);
    const [newModelStage, setModelStage] = useState(0);
    const [newModelSection, setModelSection] = useState(0);
    const [newModelName, setModelName] = useState('');
    const [informers, addInformer] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const setName = (event) => {
    setModelName(event.target.value)
  }
  const setStage = (event) => {
    setModelStage(event.target.value)
  }
  const setSection = (event) => {
    setModelSection(event.target.value)
  }

  const createModel = () => {
    if (!newModelStage){
        addInformerMethod('Не указана стадия проекта')
    } else if (!newModelSection) {
        addInformerMethod('Не указан раздел проекта')
    } else if (!newModelName) {
        addInformerMethod('Поле "Наименование" не может быть пустым')
    } else {
        props.addModel({'name': newModelName, 'stage': newModelStage, 'section': newModelSection})
        addInformerMethod('Модель с наименованием  для для раздела и стадии создана')
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

  let selectStage = (
      <select defaultValue="0" onChange={setStage}>
          <option value="0" disabled> Не выбрано </option>
          {props.stageOptions}
      </select>
  )
  let selectSection = (
      <select defaultValue="0" onChange={setSection}>
          <option value="0" disabled> Не выбрано </option>
          {props.sectionOptions}
      </select>
  )

  return (
    <>
      <div className="block-add_item">
          <div className="button-add button_add_project btn btn-primary" onClick={handleShow}>
              Добавить +
          </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Создание модели </Modal.Title>
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
                            Раздел проекта
                        </td>
                        <td>
                            {selectSection}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Стадия проекта
                        </td>
                        <td>
                            {selectStage}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={createModel}>
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