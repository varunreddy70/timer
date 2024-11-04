import React from 'react';
import Timer from './Timer';

function App() {
  return (
    <div style={styles.appContainer}>
      <Timer />
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e9ecef',
  },
};

export default App;
