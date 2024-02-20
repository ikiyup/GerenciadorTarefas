import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './components/navbar/navbar.component.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = '/';
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
