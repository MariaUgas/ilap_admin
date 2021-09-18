import React from "react";
import Modal from "react-bootstrap/Modal";
/*import ItemAcordeonArea from "../ItemAcordeonArea/ItemAcordeonArea";*/



  
  return (
    <div className="contenedor-editor">
    
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      style={{ maxWidth: "none" }}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="edicion-curso">
          <h2>Edicion de Cursos</h2>
          <form className="form-group">
            <input
              className="form-control"
              type="text"
              value={idarea}
              placeholder="Introduce codigo de categoria"
              onChange={(e) => {
                setIdarea(e.target.value);
              }}
            />
            <input
              className="form-control mt-4"
              type="text"
              value={idcurso}
              placeholder="Introduce codigo de curso"
              onChange={(e) => {
                setIdcurso(e.target.value);
              }}
            />
            <input
              className="form-control mt-4"
              type="text"
              value={curso}
              placeholder="Introduce nombre de curso"
              onChange={(e) => {
                setCurso(e.target.value);
              }}
            />
            <input
              className="form-control mt-4"
              type="text"
              value={modalidad}
              placeholder="Introduce modalidad"
              onChange={(e) => {
                setModalidad(e.target.value);
              }}
            />
            <input
              className="form-control mt-4"
              type="text"
              value={costo}
              placeholder="Introduce costo"
              onChange={(e) => {
                setCosto(e.target.value);
              }}
            />
            <button type="submit"
                className="btn btn-dark btn-block mt-4">
                  Agregar
                </button>
            
          </form>
        </div>
      </Modal.Body>
    </Modal>
  </div>

  );
};

export default AgregarCurso;
