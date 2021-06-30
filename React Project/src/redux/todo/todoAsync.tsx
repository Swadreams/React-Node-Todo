import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import API from '../axios/api';
import { CREATE_TODO_URL, TODOS_URL } from '../urls';
import { addTodo, deleteTodo, getTodos, updateTodo } from './todoSlice';
import { clearTodoError, todoError } from '../errorSlice';
import { signOut } from '../auth/authSlice';

const dispatchTodoError = (dispatch: Dispatch, error: any) => {
  if (error.code === 'ERR401') {
    dispatch(signOut(true));
  }
  dispatch(todoError(error.response.data));
};

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(clearTodoError());
      const response = await API.get(TODOS_URL);
      if (response) {
        dispatch(getTodos(response.data.todos));
      }
    } catch (error) {
      // dispatch(todoError(error.response.data));
      dispatchTodoError(dispatch, error.response.data);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodosAsync',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(clearTodoError());
      const response = await API.post(CREATE_TODO_URL, {
        title: payload.title,
      });

      if (response) {
        dispatch(addTodo(response.data.todo));
      }
    } catch (error) {
      dispatchTodoError(dispatch, error.response.data);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(clearTodoError());
      const response = await API.post(
        `${TODOS_URL}/${payload.id}`,
        payload.data
      );
      if (response) {
        // const todo = await response.data;
        // return { id: todo.id, completed: todo.completed, title: todo.title };
        dispatch(updateTodo({ ...payload, response }));
      }
    } catch (error) {
      dispatchTodoError(dispatch, error.response.data);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todo/deleteTodoAsync',
  async (payload: any, { dispatch }) => {
    try {
      dispatch(clearTodoError());
      const response = await API.delete(`${TODOS_URL}/${payload.id}`);

      if (response) {
        // return payload;
        dispatch(deleteTodo(payload));
      }
    } catch (error) {
      dispatchTodoError(dispatch, error.response.data);
    }
  }
);
