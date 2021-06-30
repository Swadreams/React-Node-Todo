import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from '../redux/todo/todoAsync';
import TotalCompletedItems from './TotalCompletedItems';
import AddTodoForm from './Form/AddTodoForm';

interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todo.todos);

  useEffect(() => {
    dispatch(getTodosAsync(''));
  }, [dispatch]);

  return (
    <>
      <div className='app-todo-section col-sm-8'>
        <AddTodoForm />
        <div className='breaker'> </div>

        {(!todos || !todos.length) && (
          <div className='alert alert-info text-center mt-5'>
            It looks you do not have any todo. Add some text in the above input
            and click above add todo button.
          </div>
        )}

        <ul
          className='app-list-group'
          style={{ margin: '0px', padding: '0px' }}
        >
          {todos.map((todo: ITodo) => (
            <TodoItem todo={todo} key={todo._id} />
          ))}
        </ul>
        {todos && todos.length > 0 && <TotalCompletedItems />}
      </div>
    </>
  );
};

export default TodoList;
