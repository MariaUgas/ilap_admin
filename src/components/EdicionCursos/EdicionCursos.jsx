import React, { useEffect, useState } from "react";
import ItemAcordeonArea from "../ItemAcordeonArea/ItemAcordeonArea.jsx";
import store from "../../firebase/firebase.js";

function EdicionCursos({ handlerUpdate, handlerAdd, handlerDelete }) {
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
    <div className="cur-dip">
      <ItemAcordeonArea
        mapaAreasObj={mapaAreasObj[0]}
        handlerUpdate={handlerUpdate}
        handlerAdd={handlerAdd}
        handlerDelete={handlerDelete}
      />
    </div>
  );
}

export default EdicionCursos;
