import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LayoutOne from './components/LayoutOne';
import LayoutTwo from './components/LayoutTwo';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navigation p-4 bg-gray-800 text-white text-center">
          <Link to="/layout1" className="btn btn-primary mx-4">Layout 1</Link>
          <Link to="/layout2" className="btn btn-secondary mx-4">Layout 2</Link>
        </nav>

        <Routes>
          <Route path="/layout1" element={<LayoutOne />} />
          <Route path="/layout2" element={<LayoutTwo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
