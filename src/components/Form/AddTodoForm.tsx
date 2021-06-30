import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../redux/todo/todoAsync';
import './AddForm.style.css';

const AddTodoForm = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const submit = (event: any) => {
    event.preventDefault();
    dispatch(
      addTodoAsync({
        title: value,
      })
    );
    setValue('');
  };

  return (
    <form className='add-todo-form' onSubmit={submit}>
      <label className='sr-only'>Name</label>
      <div className='todo-form'>
        <div className='col-sm-8'>
          <input
            type='text'
            className='form-control todo-input'
            placeholder='todo item..'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className='col-sm-4 ms-2'>
          <button
            type='submit'
            className='btn btn-primary col-12'
            disabled={!value.length}
          >
            Add Todo
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;
