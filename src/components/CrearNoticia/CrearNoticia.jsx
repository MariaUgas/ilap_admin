import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import store from "../../firebase/firebase.js";
import SunEditor from "suneditor-react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { GoInfo } from "react-icons/go";
import { auth } from "../../firebase/firebase.js";
import { useHistory } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import ilapLogo from "../../img/ilap-logo.png";

const CrearNoticia = () => {
  const fecha = new Date().toLocaleDateString();
  const fechaRef = useRef();
  const tituloRef = useRef();
  const autorRef = useRef();
  const imagenRef = useRef();
  const parrafosRef = useRef();
  const editor = useRef();

  const [send, setSend] = useState(false);
  const [show, setShow] = useState(false);
  const [tipoAlert, setTipoAlert] = useState("");
  const [message, setMessage] = useState("");

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleEditorChange = (content) => {
    parrafosRef.current.value = '"'.concat(content).concat('"');
  };

  const handleClean = () => {
    tituloRef.current.value = "";
    parrafosRef.current.value = "";
    autorRef.current.value = "";
    imagenRef.current.value = "";
    editor.current.setContents("");
  };

  useEffect(() => {
    if (send === false) return;
    store
      .collection("noticia")
      .doc()
      .set({
        titulo: tituloRef.current.value,
        fecha: fechaRef.current.defaultValue,
        contenido: parrafosRef.current.value,
        autor: autorRef.current.value,
        image: imagenRef.current.value,
      })
      .then(() => {
        setTipoAlert("info");
        setMessage("Se guardó la data del formulario exitosamente.");
      })
      .catch((error) => {
        setTipoAlert("error");
        setMessage('La operacion "Guardar" no tuvo Exito.');
      });
    setShow(true);
    handleClean();

    return  setSend(false);
  }, [send]);

  const [usuario, setUsuario] = useState(null);
  const historial = useHistory();

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
  
    <body className="creacionN" style={{background:"#cccdd3"}}>
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
      <h1>Creación de Noticias</h1>
      </div>
      
      <div className="contenedorN">
       
        <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <div className="div-toast">
          <ToastContainer position="bottom-center" style={{zIndex:"100"}}>
                <Toast onClose={() => setShow(false)} bg={tipoAlert} show={show} delay="5000" autohide>
                  <Toast.Header closeButton={false}>
                    <GoInfo size={24} />
                    <strong className="me-auto">&nbsp;&nbsp;&nbsp;Información</strong>
                    <small>Justo ahora...</small>
                  </Toast.Header>
                  <Toast.Body>{message}</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupFecha">
              <Form.Label style={{ color: "#000000" , fontWeight:"bold", paddingTop:"50px"}}>Fecha</Form.Label>
              <Form.Control
                type="text"
                readOnly
                defaultValue={fecha}
                ref={fechaRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupTitulo">
              <Form.Label style={{ color: "#000000", fontWeight:"bold"}}>Titulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese Titulo"
                ref={tituloRef}
                style={{ width: "100%" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupContenido">
              <Form.Label style={{ color: "#000000", fontWeight:"bold"}}>Contenido </Form.Label>
              <Form.Control type="hidden" ref={parrafosRef} />
              <SunEditor
                setContents=""
                showToolbar={true}
                //ref={contenidoRef}
                placeholder="Ingrese contenido..."
                minHeight="160px !important"
                height="250px"
                onChange={handleEditorChange}
                getSunEditorInstance={getSunEditorInstance}
                //setDefaultStyle="height: auto"
                setOptions={{
                  buttonList: [
                    ["undo", "redo"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "list",
                      "align",
                      "fontSize",
                      "formatBlock",
                    ],
                  ],
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAutor">
              <Form.Label style={{ color: "#000000", fontWeight:"bold" }}>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre del Autor"
                ref={autorRef}
                style={{ width: "100%" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupImagen">
              <Form.Label style={{ color: "#000000", fontWeight:"bold" }}>
                URL de Imagen
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion de imagen, ejemplo: http://path/nombre-imagen.png"
                ref={imagenRef}
                style={{ width: "100%" }}
              />
            </Form.Group>
         
             
          </Form>
          
          <div className="btn-not" style={{marginLeft:"430px", marginTop:"50px", paddingBottom:"50px"}}>
            <Button
              variant="primary"
              style={{ background: "#2c303b" }}
              onClick={() => setSend(true)}
            >
              Crear Noticia
            </Button>

          </div>
        </div>
      </div>
    </body>
  );
};
export default CrearNoticia;
