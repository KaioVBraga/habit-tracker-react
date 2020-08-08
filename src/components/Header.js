import React from 'react';
import { Link } from 'react-router-dom';
import { BaseHeader, WrapHeader } from './style/StyledComponents';

const Header = () => {
  return (
    <BaseHeader>
      <WrapHeader>
        <h2>
          <Link to="/">Habit Tracker</Link>
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '250px'
          }}
        >
          <h2>
            <Link to="/signup">Cadastrar</Link>
          </h2>
          <h2>
            <Link to="/login">Logar</Link>
          </h2>
        </div>
      </WrapHeader>
    </BaseHeader>
  );
}

export default Header;