import React from 'react';
import { Link } from 'react-router-dom';

const Anchor = ({ to, children }) => {
  return (
    <Link 
      to={to}
      style={{
        textDecoration: 'none',
        color: 'black'
      }}
    >
      {children}
    </Link>
  );
}

export default Anchor;