import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContactToast from './components/ContactToast';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Home />
      <ContactToast />
    </div>
  );
}
export default App;
