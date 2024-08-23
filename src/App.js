import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteList from './Componentes/ClienteList';
import ClienteForm from './Componentes/ClienteForm';
import Topbar from './Componentes/Topbar'
import Bottombar from './Componentes/BottomBar'

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ClienteList />} />
            <Route path="/clientes" element={<ClienteList />} />
            <Route path="/add" element={<ClienteForm />} />
            <Route path="/edit/:id" element={<ClienteForm />} />
          </Routes>
        </div>
      </div>
        <Bottombar />
    </Router>
  );
}

export default App;
