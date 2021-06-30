import React from 'react';
import './Checkbox.style.css';

interface IProp {
  value: boolean;
  changeValue: () => void;
}

const Checkbox = ({ value, changeValue }: IProp) => {
  const handleChange = (event: any) => {
    changeValue();
  };
  return (
    <>
      <div className='checkbox-container'>
        <label>
          <input
            type='checkbox'
            onChange={handleChange}
            defaultChecked={value}
          />
          <span className='checkmark'></span>
        </label>
      </div>
    </>
  );
};

export default Checkbox;
