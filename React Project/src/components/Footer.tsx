import React, { CSSProperties } from 'react';
import './FooterStyle.css';

const Footer = (props: { style?: CSSProperties | undefined }) => {
  const style = props.style || undefined;

  return (
    <p className='copyright' style={style}>
      ©2021 Created By Swadream Creations
    </p>
  );
};

export default Footer;
