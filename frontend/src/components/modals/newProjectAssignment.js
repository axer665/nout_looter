import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {faPen, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

import Informer from './../informer/main'

function Example(props) {
    const [show, setShow] = useState(false);
    const [userEmail, setUserEmail] = useState(0);
    const [userRole, setUserRole] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(0);
    const [informers, addInformer] = useState([]);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const setEmail = (event) => {
    setUserEmail(event.target.value)
  }
  const setRole = (event) => {
    setUserRole(event.target.value)
  }

  const addRole = () => {
    if (!selectedUser){
        addInformerMethod('Выберите пользователя, которому назначаете роль')
    } /*else if (!selectedRole){
        addInformerMethod('Не выбрана роль, которую необходимо присвоить пользователю')
    }*/ else {
        props.addUser({'user': selectedUser, 'role': selectedRole})
        //addInformerMethod('Пользователю назначена роль')
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

  const selectUser = (event) => {
    if (selectedUser == event.target.dataset.id)
        setSelectedUser(null)
    else
        setSelectedUser(Number(event.target.dataset.id))
  }

  const selectRole = (event) => {
    setSelectedRole(Number(event.target.value))
  }

  let users = (
    <>
        <table className="table-settings-modal-users">
        <thead>
            <tr>
                <th>
                    E-mail
                </th>
                <th>
                    ФИО
                </th>
            </tr>
        </thead>
        <tbody>
            {
                props.users.map(user => {
                    let i, p, nameClass
                    if (selectedUser == user.id){
                        nameClass = "selected"
                    }
                    if (user.last_name) i = user.last_name[0].toUpperCase()+'.'
                    if (user.patronymic) i = user.patronymic[0].toUpperCase()+'.'
                    return (
                        <tr key={user.id+"-"+selectedUser} className={nameClass} data-id={user.id} onClick={selectUser}>
                            <td data-id={user.id}>
                                {user.email}
                            </td>
                            <td data-id={user.id}>
                                {user.first_name} {i} {p}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
    </>
  )

  const selectOptions = (
      props.roles.map(
          (role, key) => {
              return (<option key={role.id} value={role.id}> {role.name} </option>)
          }
      )
  )

  let selectRoles = (
      <select defaultValue="0" onChange={selectRole}>
          <option value="0" disabled> Не выбрано </option>
          {selectOptions}
      </select>
  )

  return (
    <>
      <div className="block-add_item">
          <div className="button-add button_add_project" onClick={handleShow}>
              Добавить +
          </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Добавление нового пользователя к проекту </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table-create">
                <thead>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            Пользователь
                        </td>
                        <td>
                            <div>
                                {users}
                            </div>
                        </td>
                    </tr>
                    {/*<tr>
                        <td>
                            Роль
                        </td>
                        <td>
                            {selectRoles}
                        </td>
                    </tr>*/}
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={addRole}>
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