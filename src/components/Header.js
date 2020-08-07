import React from 'react';

const Header = () => {
  return (
    <div
      style={{
        height: '70px',
        width: '100%',
        
        position: 'fixed',
        left: 0,
        top: 0,
        
        backgroundColor: 'red',
      }}
    >
      Habit Tracker
    </div>
  );
}

export default Header;