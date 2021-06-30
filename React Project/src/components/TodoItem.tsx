import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodoAsync, deleteTodoAsync } from '../redux/todo/todoAsync';
import FormControl from 'react-bootstrap/FormControl';
import Checkbox from './checkbox/Checkbox';
import Modal from './Modal';

export interface IProps {
  todo: {
    _id: string;
    title: string;
    completed: boolean;
  };
}

const TodoItem = ({ todo }: IProps) => {
  const { _id, title, completed } = todo;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [todoCheck, setTodoCheck] = useState(completed);
  const [showDialog, setShowDialog] = useState(false);
  const todoUpdateError = useSelector(
    (state: any) => state.errors.todoUpdateError
  );
  const todoDeleteError = useSelector(
    (state: any) => state.errors.todoDeleteError
  );
  const dispatch = useDispatch();

  const handleUpdateItem = () => {
    setTodoCheck(!todoCheck);
    dispatch(updateTodoAsync({ id: _id, data: { completed: todoCheck } }));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id: _id }));
  };

  const handleDialogClose = (isUpdate = false) => {
    if (isUpdate) {
      dispatch(updateTodoAsync({ id: _id, data: { title: updatedTitle } }));
    } else {
      setUpdatedTitle(title);
    }
    setShowDialog(!showDialog);
  };
  return (
    <>
      {(todoUpdateError || todoDeleteError) && (
        <div className='alert alert-danger'>
          {todoUpdateError?.errorMessage || todoDeleteError?.errorMessage}
        </div>
      )}
      <li className='app-list-item'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            {/* <input
              type='checkbox'
              checked={completed}
              onChange={handleUpdateItem}
            /> */}
            <Checkbox value={todoCheck} changeValue={handleUpdateItem} />
            <span className='app-todo-text ms-3'>{title}</span>
          </div>
          <div>
            <button
              className='btn btn-outline-primary me-3'
              onClick={() => setShowDialog(true)}
            >
              <i className='fa fa-edit'></i>
            </button>
            <button
              className='btn btn-outline-danger'
              onClick={handleDeleteClick}
            >
              <i className='fa fa-trash'></i>
            </button>
          </div>
        </div>
      </li>
      <Modal
        show={showDialog}
        handleClose={handleDialogClose}
        heading='Update Todo Item'
      >
        <form>
          <FormControl
            type='text'
            placeholder='Enter todo'
            value={updatedTitle}
            onChange={(event) => {
              setUpdatedTitle(event.target.value);
            }}
          />
        </form>
      </Modal>
    </>
  );
};

export default TodoItem;
