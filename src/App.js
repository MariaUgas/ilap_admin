import React, {useState, useHistory, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EdicionCatalogo from "./components/EdicionCatalogo/EdicionCatalogo.jsx";
import CrearNoticia from "./components/CrearNoticia/CrearNoticia.jsx";
import Login from "./components/Login/Login.jsx";
import Admin from "./components/Admin/Admin.jsx";
import {auth} from "./firebase/firebase.js";

function App() {
 
  
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.email);
      }
    });
  }, []);


  return (
 
    <div className="container">
      
            <Router>
                <Switch>
                  <Route exact path="/ilap_admin" component={Login}></Route>
                  <Route path="/admin" component={Admin}></Route>
                  <Route path="/catalogo" component={EdicionCatalogo}></Route>
                  <Route path="/noticia" component={CrearNoticia}></Route>
                </Switch>
            </Router>
           
    </div>
  );
}

export default App;
