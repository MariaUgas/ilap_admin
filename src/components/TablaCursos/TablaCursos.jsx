import React, { useEffect, useState } from "react";
import store from "../../firebase/firebase.js";
import Table from "react-bootstrap/Table";
import { FcPlus, FcMinus, FcEditImage } from "react-icons/fc";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const TablaCursos = ({ idarea, handlerUpdate }) => {
  const [objetoCursos, setObjetoCursos] = useState([]);

  useEffect(() => {
    store.collection("cursos").onSnapshot((snap) => {
      const documents = [];
      snap.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setObjetoCursos(documents);
    });
  }, []);

  const mapeo = objetoCursos.map((cursos) => cursos);

  const filterByArea = mapeo.filter((curso) => {
    if (curso.idarea === idarea) {
      return true;
    }
  });

  return (
    <div className="accordion-body">
      <div className="tabla-cursos">
        <Table striped bordered hover size="sm" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">Curso</th>
              <th scope="col" width="30%">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filterByArea.map((curso) => (
              <tr>
                <td>{curso.curso}</td>
                <td>
                  <div className="btns-edition">
                    <OverlayTrigger
                      overlay={
                        <Tooltip id={curso.id}>
                          Editar Información del Curso
                        </Tooltip>
                      }
                    >
                      <button className="btn-icon">
                        <FcEditImage
                          className="btn-editar "
                          size={24}
                          onClick={(id) => {
                            handlerUpdate(curso.id);
                          }}
                        />
                      </button>
                    </OverlayTrigger>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablaCursos;
