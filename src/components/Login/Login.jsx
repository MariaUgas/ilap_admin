import React, { useState } from "react";
import { auth } from "../../firebase/firebase.js";
import { useHistory } from "react-router-dom";
import ilaplogo from "../../img/ilap-logo.png";

const Login = () => {
  const historial = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msgerror, setMsgError] = useState("");

  const RegistrarUsuario = (e) => {
    e.preventDefault();
    try {
      auth.createUserWithEmailAndPassword(email, pass);
      alert("usuario registrado");
    } catch (e) {
      console.log(e);
    }
  };

  const LoginUsuario = () => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((r) => {
        if (email === "nataly@ilap.edu.ve") {
          historial.push("/catalogo7asf2XbP");
        }
        if (email === "patricia@ilap.edu.ve") {
          historial.push("/noticiah7723BoC8");
        }
        if (email === "admin@ilap.edu.ve") {
          historial.push("/adminY0aES8zzD");
        }
        if (email === "grasso@ilap.edu.ve") {
          historial.push("/adminY0aES8zzD");
        }
        
      })
      .catch((err) => {
        /*auth/wrong-password*/
        console.log(err.code);
        if (err.code === "auth/wrong-password") {
          setMsgError("Password incorrecto");
        }
        if (err.code === "auth/user-not-found") {
          setMsgError("Usuario no registrado");
        }
      });
  };

  return (
    <div>
      <div className="imagen">
        <img src={ilaplogo} alt="ilap-logo" className="img-logo" />
      </div>
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col">
          <form action="" onSubmit={RegistrarUsuario} className="form-group">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              placeholder="Introduzca su Email"
              type="email"
            />
            <input
              onChange={(e) => {
                setPass(e.target.value);
              }}
              className="form-control mt-4"
              placeholder="Introduzca su Password"
              type="password"
            />
          </form>
          <div className="btn-login">
            <button
              onClick={LoginUsuario}
              className="btn btn-block btn-color mt-4"
            >
              Iniciar sesion
            </button>
          </div>
            <div className="msgError" style={{color:"red", textAlign:"center", fontWeight:"bold" ,marginTop:"20px"}}>
              {msgerror != null ? <div>{msgerror}</div> : <span></span>}
            </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Login;
