import React, { useState, useEffect } from "react";
//import store from "../../firebase/firebase.js";
import { Accordion } from "react-bootstrap";
import TablaCursos from "../TablaCursos/TablaCursos.jsx";

export const ItemAcordeonArea = ({ mapaAreasObj }) => {
  return (
    <div className="contenedor-cursos" id="cursos-id">
      <Accordion flush>
        {mapaAreasObj &&
          mapaAreasObj.map((a, i) => {
            return (
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{a.nombre}</Accordion.Header>
                <Accordion.Body >
                <div className="tabla-cursos">
                  <Table striped bordered hover size="sm" style={{ width: "90%" }}>
                    <thead>
                      <tr>
                        <th scope="col">Curso</th>
                        <th scope="col" width="20%">
                          Modalidad
                        </th>
                        <th scope="col" width="16%">
                          Costo (USD)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterByArea.map((curso) => (
                        <tr>
                          <td>{curso.curso}</td>
                          <td>{curso.modalidad}</td>
                          <td style={{ textAlign: "center" }}>{curso.costo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </div>
  );
};

export default ItemAcordeonArea;
