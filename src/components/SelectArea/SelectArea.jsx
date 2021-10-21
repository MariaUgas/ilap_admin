import React, {useState, useEffect} from "react"
import store from "../../firebase/firebase.js";



const SelectArea = ({itemCategoriaRef}) => {

  
   const [areasObj, setAreasObj] = useState([]);

    useEffect(() => {
      store.collection("areas").onSnapshot((snap) => {
        const documents = [];
        snap.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setAreasObj(documents);
      });
    }, []);
  
    const mapaAreasObj = areasObj.map((areaObj) => {
      return areaObj.areas;

    });
    
    
    
  
    
    return (
        <section>

                <label style={{ color: "#000000" }}>Categorias</label>
                    <select aria-label="Default select example" ref={itemCategoriaRef} style={{ width: "100%", height:"50px" }} >
                    
                      {mapaAreasObj[0] &&
                        mapaAreasObj[0].map((identCurso) => {
                    
                    return <option value={identCurso.codigo}>{identCurso.nombre}</option>;
                        })}
                    </select>
        </section>

    )
}

export default SelectArea;
/*import React, { useState, useEffect, useRef } from "react";
import store from "../../firebase/firebase.js";

const SelectArea = ({ itemCategoriaRef }) => {
  const [areasObj, setAreasObj] = useState([]);

  useEffect(() => {
    store.collection("areas").onSnapshot((snap) => {
      const documents = [];
      snap.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setAreasObj(documents);
    });
  }, []);

  const mapaAreasObj = areasObj.map((areaObj) => {
    return areaObj.areas;
  });

  return (
    <section>
      <label style={{ color: "#000000" }}>Categorias</label>
      <select
        aria-label="Default select example"
        ref={itemCategoriaRef}
        style={{ width: "100%", height: "50px" }}
      >
        {mapaAreasObj[0] &&
          mapaAreasObj[0].map((identCurso) => {
            return (
              <option value={identCurso.codigo}>{identCurso.nombre}</option>
            );
          })}
      </select>
    </section>
  );
};

export default SelectArea;*/
