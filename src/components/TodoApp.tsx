import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import Loader from './loader/Loader';
import Error from './Error';
import { logoutAsync } from '../redux/auth/authAsync';
import Footer from './Footer';
import image1 from '../img/todo.jpeg';

const TodoApp = (props: any) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.todo.loading);
  const todoError = useSelector((state: any) => state.errors.todoError);
  const profile = useSelector((state: any) => state.auth.profile);

  const signOut = () => {
    dispatch(logoutAsync(true));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className='app-container'
        style={{ backgroundImage: `url(${image1})` }}
      >
        <nav className='navbar navbar-expand-sm app-header'>
          <div className='app-header-name'>
            <h3>
              Welcome{' '}
              {profile && profile.name
                ? profile.name
                : profile.email
                ? profile.email
                : 'User'}
              ,
            </h3>
          </div>
          <button
            className='btn btn-outline nav-link active'
            aria-current='page'
            onClick={signOut}
          >
            <i className='fa fa-sign-out'></i> Logout
          </button>
        </nav>

        {todoError && <Error errorMessage={todoError.message} />}
        <TodoList />
      </div>
      <Footer />
    </>
  );
};

export default TodoApp;
