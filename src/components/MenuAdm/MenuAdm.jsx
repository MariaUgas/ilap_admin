import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import {auth} from "../../firebase/firebase.js"

const MenuAdm = () => {

        const historial = useHistory();
        const [usuario, setUsuario] = useState(null)
    
    useEffect( ()=>{
        
        auth.onAuthStateChanged ((user)=>{
            if(user){
                setUsuario(user.email)
            }
        })
    },[])

    const CerrarSesion = ()=>{
        auth.signOut();
        setUsuario(null)
        historial.push("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                   
                    <li className="nav-item">
                        {
                        !usuario ?
                        (
                            <Link className="nav-link" to="/">Login</Link>
                        )
                        :
                        (
                            <span></span>
                        )
                        }
                    </li>
                  
                </ul>
                {
                    usuario ?
                    (
                        <button className="btn btn-danger float-rigth" onClick={CerrarSesion}>Cerrar sesion</button>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}

export default MenuAdm;