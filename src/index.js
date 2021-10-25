import React from "react";
import ReactDom from "react-dom";
import App from "./App";
//eslint-disable-next-line
import bootstrap from "./css/bootstrap.min.css";
import "./css/estilo.css";

const divRoot = document.querySelector("#root")

ReactDom.render(
  [

    <App />
  ],
 
  divRoot
);
