import React, { useEffect, useState } from "react";
import store from "../../firebase/firebase.js";
import Table from "react-bootstrap/Table";

export const TablaCursos = ({ idarea }) => {
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

  //console.log(filterByArea);

  return (
    <div className="accordion-body">
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
    </div>
  );
};

export default TablaCursos;
