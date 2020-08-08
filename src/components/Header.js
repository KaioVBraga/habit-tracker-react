import React from 'react';
import { BaseHeader, WrapHeader } from './style/StyledComponents';
import Anchor  from './Anchor';

const Header = () => {
  return (
    <BaseHeader>
      <WrapHeader>
        <h2 style={{ fontFamily: 'comfortaa' }}>
          <Anchor to="/">Tracker</Anchor>
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '250px'
          }}
        >
          <h2 style={{ fontFamily: 'roboto' }}>
            <Anchor to="/signup">Cadastrar</Anchor>
          </h2>
          <h2 style={{ fontFamily: 'roboto' }}>
            <Anchor to="/login">Logar</Anchor>
          </h2>
        </div>
      </WrapHeader>
    </BaseHeader>
  );
}

export default Header;