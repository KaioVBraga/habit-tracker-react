import React from 'react';
import { BaseHeader } from './style/StyledComponents';

const Header = () => {
  return (
    <BaseHeader>
      <h2>Habit Tracker</h2>
      <div
        style={{
          display: 'flex'
        }}
      >
        <h2>Cadastrar</h2>
        <h2>Logar</h2>
      </div>
    </BaseHeader>
  );
}

export default Header;