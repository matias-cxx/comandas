import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LlamadorComandas from './App.jsx'
import PanelPublico from './PanelPublico.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/cocina" element={<LlamadorComandas />} />
        <Route path="/publico" element={<PanelPublico />} />
        <Route path="*" element={<Navigate to="/cocina" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LlamadorComandas from './App.jsx'
import PanelPublico from './PanelPublico.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/cocina" element={<LlamadorComandas />} />
        <Route path="/publico" element={<PanelPublico />} />
        <Route path="*" element={<Navigate to="/cocina" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
//   };
//