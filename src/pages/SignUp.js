import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
        <h1>Cadastro</h1>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '40vw' 
        }}>
          <input
            placeholder="Seu nome"
            value={name}
            onChange={ e => setName(e.target.value)}
            style={{
              marginBottom: '20px'
            }}
            type="text" 
          />
          <input 
            placeholder="Seu email"
            value={email}
            onChange={ e => setEmail(e.target.value)}
            style={{
              marginBottom: '20px'
            }}
            type="email" 
          />
          <input
            placeholder="Sua senha"
            value={password}
            onChange={ e => setPassword(e.target.value)}
            style={{
              marginBottom: '20px'
            }} 
            type="password" 
          />

          <button 
            style={{ 
              backgroundColor: "#646abd",
              paddingTop: '10px',
              paddingBottom: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            Cadastrar
          </button>
        </div>
    </div>
  );
}

export default SignUp;