import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: false,
  authError: null,
  todoError: null,
};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    authError: (state, action) => {
      return { ...state, authError: action.payload };
    },
    clearAuthError: (state, action) => {
      return { ...state, authError: null };
    },
    todoError: (state, action) => {
      return { ...state, todoError: action.payload };
    },
    clearTodoError: (state) => {
      return { ...state, todoError: null };
    },
  },
});

export const { authError, clearAuthError, todoError, clearTodoError } =
  errorSlice.actions;
export default errorSlice.reducer;
