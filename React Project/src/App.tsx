import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import TodoApp from './components/TodoApp';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';

function App() {
  const isSignedIn = useSelector(
    (state: { auth: any }) => state.auth.isSignedIn
  );
  return (
    <Router>
      <Route path='/' exact component={LoginPage} />
      {isSignedIn ? (
        <Route path='/todos' component={TodoApp} />
      ) : (
        <Redirect to='/' />
      )}
    </Router>
  );
}

export default App;
