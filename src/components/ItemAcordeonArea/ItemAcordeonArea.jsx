import React, { useState, useEffect } from "react";
//import store from "../../firebase/firebase.js";
import { Accordion } from "react-bootstrap";
import TablaCursos from "../TablaCursos/TablaCursos.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FcPlus } from "react-icons/fc";

export const ItemAcordeonArea = ({ mapaAreasObj, handlerUpdate, handlerAdd, handlerDelete }) => {


  
  return (
    <div className="contenedor-cursos" id="cursos-id">
      <h2>Administracion de Cursos</h2>
      <div className="sub-head">

      <h3 className="titulo">Cursos disponibles por categoría</h3>
      <div className="btns-edition">
                    <OverlayTrigger
                      overlay={
                        <Tooltip >
                          Agregar Nuevo Curso
                        </Tooltip>
                      }
                    >
                      <button className="btn-icon">
                        <FcPlus
                          className="btn-agregar "
                          size={24}
                          onClick={() => {
                            handlerAdd();
                          }}
                        />
                      </button>
                    </OverlayTrigger>
                  </div>
      </div>
      <Accordion flush>
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
