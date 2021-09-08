import React, { useState, useEffect } from "react";
//import store from "../../firebase/firebase.js";
import { Accordion } from "react-bootstrap";
import TablaCursos from "../TablaCursos/TablaCursos.jsx";

export const ItemAcordeonArea = ({ mapaAreasObj, handlerUpdate }) => {
  return (
    <div className="contenedor-cursos" id="cursos-id">
      <h3 className="titulo">Cursos disponible por categoría</h3>
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
