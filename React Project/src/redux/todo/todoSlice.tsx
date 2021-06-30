import { createSlice } from '@reduxjs/toolkit';
import { logoutAsync } from '../auth/authAsync';
import {
  anyPendingAction,
  anyFulfilledAction,
  anyLoadAction,
} from '../common/asyncActions';

interface ITodo {
  loading: boolean;
  todos: {
    title: string;
    id: string;
    completed: boolean;
    date: string;
  }[];
}

const initialState: ITodo = {
  loading: false,
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      try {
        const index = state.todos.findIndex((todo: any) => {
          return todo._id === action.payload.id;
        });
        state.todos[index].completed = !!action.payload.data.completed;
        if (action.payload.data.title) {
          state.todos[index].title = action.payload.data.title;
        }
        // state.todos.map((todo: any) => {
        //   if (todo._id === action.payload.id) {
        //     todo.completed = !!action.payload.data.completed;
        //     if (action.payload.data.title) {
        //       todo.title = action.payload.data.title;
        //     }
        //   }
        //   return todo;
        // });
      } catch (error) {
        console.log(error);
      }
    },
    deleteTodo: (state, action) => {
      console.log('Delete todo', state.todos);
      const todos = state.todos.filter(
        (todo: any) => todo._id !== action.payload.id
      );
      state.todos = todos;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(logoutAsync.fulfilled, (state, action) => {
        console.log('todo reducer logout');
        return { ...initialState };
      })
      .addMatcher(anyPendingAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(anyFulfilledAction, (state, action) => {
        state.loading = false;
      })
      .addMatcher(anyLoadAction, (state, action) => {
        state.loading = false;
      });
  },
});

export const { getTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
