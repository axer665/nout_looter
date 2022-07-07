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
    const [newProjectStatus, setProjectStatus] = useState(0)
    const [newProjectType, setProjectType] = useState(0)
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
  const setType = (event) => {
    setProjectType(event.target.value)
  }
  const setStatus = (event) => {
    setProjectStatus(event.target.value)
  }

  const createProject = () => {
    if (!newProjectCode){
        addInformerMethod('Поле "Код проекта" не может быть пустым')
    } else if (!newProjectName) {
        addInformerMethod('Поле "Наименование" не может быть пустым')
    } else {
        props.addProject({
            'name': newProjectName,
            'code': newProjectCode,
            'type': newProjectType,
            'status': newProjectStatus
        })
        addInformerMethod('Проект под кодом '+newProjectCode+' с наименованием '+newProjectName+' создан')
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

  let optionsStatus = (
    props.statuses.map(status => {
        return(
            <option key={status.id} value={status.id}> {status.value} </option>
        )
    })
  )
  let selectStatus = (
    <select defaultValue={0} onChange={setStatus}>
        <option value={0} disabled> Не выбрано </option>
        {optionsStatus}
    </select>
  )

  let optionsType = (
      props.types.map(type => {
          return(
              <option key={type.id} value={type.id}> {type.name} </option>
          )
      })
    )
    let selectType = (
      <select defaultValue={0} onChange={setType}>
          <option value={0} disabled> Не выбрано </option>
          {optionsType}
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
          <Modal.Title> Создание проекта </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table-create">
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            Код проекта
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
                    <tr>
                        <td>
                            Статус
                        </td>
                        <td>
                            {selectStatus}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Тип проекта
                        </td>
                        <td>
                            {selectType}
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