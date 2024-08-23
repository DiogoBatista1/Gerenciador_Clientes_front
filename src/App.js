import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteList from './Componentes/ClienteList';
import ClienteForm from './Componentes/ClienteForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ClienteList />} />
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/add" element={<ClienteForm />} />
          <Route path="/edit/:id" element={<ClienteForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
