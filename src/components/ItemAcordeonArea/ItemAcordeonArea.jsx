import React, { useState, useEffect } from "react";
//import store from "../../firebase/firebase.js";
import { Accordion } from "react-bootstrap";
import TablaCursos from "../TablaCursos/TablaCursos.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FcPlus } from "react-icons/fc";
import { auth } from "../../firebase/firebase.js";
import { useHistory } from "react-router-dom";
import ilapLogo from "../../img/ilap-logo.png";

export const ItemAcordeonArea = ({ mapaAreasObj, handlerUpdate, handlerAdd, handlerDelete}) => {

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

  const volverAdmin = () => {
    historial.push("/admin");
  };

  const [userAdmin, setUserAdmin] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if (user.email === "admin@ilap.edu.ve" || user.email === "grasso@ilap.edu.ve"){
        setUserAdmin(true)
      }
    })
  }, []);

  
  return (
    <div className="contenedor-cursos" id="cursos-id">
     
     <div class="container-nav">
    <img src={ilapLogo} alt="logo-ilap" width="150px" style={{marginRight:"450px"}}/>
    
    <ul>
     <li>
      {userAdmin ? (
            <a href="/admin" onClick={volverAdmin}>
            Regresar a Admin
          </a>
           ) : (
            <span style={{color:"transparent"}}>contenido para hacer espacio</span>
        )}
      </li>
      <li>
      {usuario ? (
        <a href="javascript:void(0)" onClick={CerrarSesion} style={{fontWeight:"bold"}}>Cerrar sesion</a>
        ) : (
          <span></span>
        )}
      </li>
      </ul>
  </div>
  <hr />
  <div className="img-admin">
    <h1>Edición de Cursos</h1>
  </div>
      <div className="sub-head">
        <div className="btns-edition" style={{marginLeft:"1050px", marginBottom:"25px"}}>
                    <OverlayTrigger
                      overlay={
                        <Tooltip >
                          Agregar Nuevo Curso
                        </Tooltip>
                      }
                    >
                      <button className="btn-icon" >
                        <FcPlus
                          className="btn-agregar "
                          size={35}
                          onClick={() => {
                            handlerAdd();
                          }}
                          
                        />
                      </button>
                    </OverlayTrigger>
                  </div>
      </div>
      <Accordion flush style={{width:"70%", marginLeft:"auto", marginRight:"auto", marginBottom:"100px"}}>
        {mapaAreasObj &&
          mapaAreasObj.map((a, i) => {
            return (
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{a.nombre}</Accordion.Header>
                <Accordion.Body>
                  <TablaCursos
                    idarea={a.codigo}
                    handlerUpdate={handlerUpdate}
                    handlerDelete={handlerDelete}
                  />
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </div>
  );
};

export default ItemAcordeonArea;
