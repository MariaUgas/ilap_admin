import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.js";
import { useHistory } from "react-router-dom";
import fondo from "../../img/fondo.jpg";
import ilapLogo from "../../img/ilap-logo.png";



export const Admin = () => {

  const historial = useHistory();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.email);
      }
    });
  }, []);

  const CerrarSesion = () => {
    auth.signOut();
    setUsuario(null);
    historial.push("/ilap_admin");
  };
    
  return (
  <div>
    <div class="container-nav">
    <img src={ilapLogo} alt="logo-ilap" width="150px" style={{marginRight:"450px"}}/>
    
    <ul>
      <li>
        <a href="/catalogo7asf2XbP">Cursos</a>
      </li>
      <li>
        <a href="/noticiah7723BoC8">Noticia</a>
      </li>
      <li>
      {usuario ? (
        //eslint-disable-next-line
        <a href="javascript:void(0)" onClick={CerrarSesion} style={{fontWeight:"bold"}}>Cerrar sesion</a>
        ) : (
          <span></span>
        )}
      </li>
      </ul>
  </div>
       <hr />
        <div className="img-admin">
        <h1>Administración Web</h1>
          <img src={fondo} alt="img-admin" style={{marginLeft:"200px", marginTop:"70px"}}/>
        </div>
 </div>


        
    )
}

export default Admin;
