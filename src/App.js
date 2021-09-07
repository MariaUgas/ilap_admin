import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Inicio from "./components/Inicio/Inicio.jsx"
import EdicionCatalogo from "./components/EdicionCatalogo/EdicionCatalogo.jsx"
import CrearNoticia from "./components/CrearNoticia/CrearNoticia.jsx"
import Login from "./components/Login/Login.jsx"
import Menu from "./components/MenuAdm/MenuAdm.jsx"



function App() {
  return (
  <div className="container">
    <Router>
      <Menu></Menu>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/catalogo" component={EdicionCatalogo}></Route>
        <Route path="/noticia" component={CrearNoticia}></Route>
      </Switch>
    </Router>
    
  </div>

  );
}

export default App;
