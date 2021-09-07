import React, {useState} from "react"
import {auth} from "../../firebase/firebase.js"
import {useHistory} from "react-router-dom"
import LogoIlap from "../../img/LogoIlap.png";


const Login = () => {

    const historial = useHistory()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [msgerror, setMsgError] = useState("")

    const RegistrarUsuario = (e) => {
        e.preventDefault()
        try{
            auth.createUserWithEmailAndPassword(email, pass)
            alert("usuario registrado")
        }catch(e){
            console.log(e)
        }
    }

    const LoginUsuario = () =>{
        auth.signInWithEmailAndPassword(email, pass)
        .then((r) => {
            if(email === "nataly@ilap.edu.ve"){
                historial.push("/catalogo")
            }
            if(email === "patricia@ilap.edu.ve"){
                historial.push("/noticia")
            }
            })
        .catch((err) =>{
            /*auth/wrong-password*/
            console.log(err.code)
            if(err.code === "auth/wrong-password"){
                setMsgError("Password incorrecto")
            }
            if(err.code ==="auth/user-not-found"){
                setMsgError("Usuario no registrado")
            }
        })
    }

    return (
        <div>
            <div className="imagen">
                <img src={LogoIlap} alt="" />
            </div>
            <div className="row mt-5">
                <div className="col"></div>
                <div className="col">
                    <form action="" onSubmit={RegistrarUsuario} className="form-group">
                        <input onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Introduzca su Email" type="email" />
                        <input onChange={(e)=>{setPass(e.target.value)}} className="form-control mt-4" placeholder="Introduzca su Password" type="password" />
                        
                    </form>
                    <button onClick={LoginUsuario} className="btn btn-block btn-success mt-4">
                        Iniciar sesion
                    </button>
                    {
                        msgerror != null?
                        (
                            <div>
                                {msgerror}
                            </div>
                        )
                        :
                        (
                            <span></span>
                        )
                    }
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Login