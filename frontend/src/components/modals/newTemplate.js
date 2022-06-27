import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function Example(props) {
    const [show, setShow] = useState(false);
    const [newTemplateStage, setTemplateStage] = useState(0);
    const [newTemplateSection, setTemplateSection] = useState(0);
    const [newTemplateOType, setTemplateOType] = useState(0);
    const [newTemplateName, setTemplateName] = useState('');
    const [informers, addInformer] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const setName = (event) => {
    setTemplateName(event.target.value)
  }
  const setStage = (event) => {
    setTemplateStage(event.target.value)
  }
  const setSection = (event) => {
    setTemplateSection(event.target.value)
  }
  const setOType = (event) => {
      setTemplateOType(event.target.value)
    }

  const createTemplate = () => {
    if (!newTemplateStage){
        addInformerMethod('Не указана стадия проекта')
    } else if (!newTemplateOType) {
        addInformerMethod('Не указан тип объекта')
    } else if (!newTemplateSection) {
        addInformerMethod('Не указан <раздел проекта>')
    } else if (!newTemplateName) {
        addInformerMethod('Поле <Версия> не может быть пустым')
    } else {
        props.addTemplate({'version': newTemplateName, 'stage': newTemplateStage, 'section': newTemplateSection, 'type': newTemplateOType})
        addInformerMethod('Шаблон создан')
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
  let selectOType = (
      <select defaultValue="0" onChange={setOType}>
          <option value="0" disabled> Не выбрано </option>
          {props.sectionOType}
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
          <Modal.Title> Создание шаблона </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table-create">
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            Версия
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
                            {selectOType}
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
          <Button variant="primary" onClick={createTemplate}>
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