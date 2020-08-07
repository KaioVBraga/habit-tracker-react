import React from 'react';
import { CenteredContainer } from '../components/style/StyledComponents';
import Header from '../components/Header';

const Home = () => {
  return (
    <CenteredContainer>
      <Header />
      
      <h1>Habit Tracker</h1>

      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '40vw' 
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          Aprenda a regular melhor seus hábitos
        </div>
      </div>
    </CenteredContainer>
  );
}

export default Home;