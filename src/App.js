
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { StoreContextProvider } from './services/StoreContext';
import AppRoutes from './AppRoutes'; // Import the new AppRoutes component

function App() {
  return (
    <StoreContextProvider>
      <Router>
        <AppRoutes/> {/* Render the AppRoutes component here */}
      </Router>
    </StoreContextProvider>
  );
}

export default App;



