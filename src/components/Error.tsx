import React from 'react';

interface IError {
  errorMessage: string;
}

const Error = ({ errorMessage }: IError) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div className='login-error-message'>
      <i className='fa fa-exclamation-triangle'></i> {errorMessage}
    </div>
  );
};

export default Error;
