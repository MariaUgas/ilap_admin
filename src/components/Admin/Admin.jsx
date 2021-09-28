import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.js";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from "react-router-dom";
import fondo from "../../img/fondo.jpg";



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
  <div className="body-admin">
           
  <Navbar bg="dark" variant="dark">
    <Container>
        <div className="ladmin">
            <Navbar.Brand href="#home" style={{color:"#f38115", fontWeight:"bold"}}>ILAP ADMINISTRACION</Navbar.Brand>
        </div>
    <Nav className="me-auto" style={{textAlign:"right"}}>
     
      <Nav.Link href="/catalogo" style={{paddingLeft:"800px"}}>Cursos</Nav.Link>
      <Nav.Link href="/noticia">Noticias</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
      {usuario ? (
          <button className="btn btn-danger" style={{marginLeft:"1100px", marginTop:"50px"}} onClick={CerrarSesion}>
            Cerrar sesion
          </button>
        ) : (
          <span></span>
        )}
        <div className="img-admin">
          <img src={fondo} alt="img-admin"/>
        </div>
 </div>


        
    )
}

export default Admin;
