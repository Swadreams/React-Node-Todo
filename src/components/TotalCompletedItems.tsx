import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompletedItems = () => {
  const completedTodos = useSelector((state: any) =>
    state.todo.todos.filter((todo: any) => todo.completed)
  );

  const uncompleteTodos = useSelector((state: any) =>
    state.todo.todos.filter((todo: any) => !todo.completed)
  );

  return (
    <>
      <div className='todo-summary'>
        <div>Pending: {uncompleteTodos.length}</div>
        <div>Done: {completedTodos.length}</div>
      </div>
    </>
  );
};

export default TotalCompletedItems;
