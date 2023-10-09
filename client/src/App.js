import logo from './logo.svg';
import './App.css';
import RoutesFile from "./Routes";
import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import AlumniSignUp from "./AlumniSignUp";
import AlumniLogin from "./AlumniLogin";
import AlumniHome from "./AlumniHome";

function App() {
  return (
    // <React.Fragment>
    // <AlumniSignUp />
<Router>
    <Routes>
      <Route path="/" element={<AlumniSignUp />} />
      <Route path="/AlumniSignUp" element={<AlumniSignUp />} />
      <Route path="/AlumniHome" element={<AlumniHome />} />
      <Route path="/AlumniLogin" element={<AlumniLogin />} />
    </Routes>
</Router>

    //  </React.Fragment>
    // <div><p>hello</p></div>
  );
}

export default App;
