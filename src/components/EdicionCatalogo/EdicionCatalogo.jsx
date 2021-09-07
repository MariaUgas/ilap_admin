import React, {useState, useEffect} from "react"
import store from "../../firebase/firebase.js"

const EdicionCatalogo = () => {
    const [idCatalogo, setIdcatalogo] = useState("")
    const [modoEdicion, setModoEdicion] = useState(null)
    const [idarea, setIdarea] = useState("")
    const [idcurso, setIdcurso] = useState("")
    const [curso, setCurso] = useState("")
    const [modalidad, setModalidad] = useState("")
    const [costo, setCosto] = useState("")
    const [error, setError] = useState("")
    const [cursos, setCursos] = useState([])

    useEffect( ()=>{
        const getCursos =async()=>{
            const {docs} = await store.collection("cursos").get()
            const nuevoArray = docs.map(item =>({id:item.id, ...item.data()}))
            setCursos(nuevoArray)
        }
        getCursos()
    },[])

    const setCatalogo = async(e) =>{
        e.preventDefault()
        if(!idarea.trim()){
            setError("campo vacio")
        }
        if(!idcurso.trim()){
            setError("campo vacio")
        }
        if(!curso.trim()){
            setError("campo vacio")
        }
        if(!modalidad.trim()){
            setError("campo vacio")
        }
        if(!costo.trim()){
            setError("campo vacio")
        }

        const itemCursos = {
            idarea: idarea,
            idcurso: idcurso,
            curso: curso,
            modalidad: modalidad,
            costo: costo 
        }

        try{
            const data = await store.collection("cursos").add(itemCursos)
            const {docs} = await store.collection("cursos").get()
            const nuevoArray = docs.map(item =>({id:item.id, ...item.data()}))
            setCursos(nuevoArray)
            alert("curso agregado")
        }catch(e){
            console.log(e)
        }

        setIdarea("");
        setIdcurso("");
        setCurso("");
        setModalidad("");
        setCosto("");


    }

    const BorrarCurso = async (id)=>{
        try{
            await store.collection("cursos").doc(id).delete()
            const {docs} = await store.collection("cursos").get()
            const nuevoArray = docs.map(item =>({id:item.id, ...item.data()}))
            setCursos(nuevoArray)
        }catch(e){
            console.log(e)
        }
    }

    const pulsarActualizar = async(id)=>{
        try{
            const data = await store.collection("cursos").doc(id).get();
            const {idarea, idcurso, curso, modalidad, costo} = data.data();
            
            setIdarea(idarea)
            setIdcurso(idcurso)
            setCurso(curso)
            setModalidad(modalidad)
            setCosto(costo)
            setIdcatalogo(id)
            setModoEdicion(true)
            console.log(id)
        }catch(e){
            console.log(e)
        }
        
    }

    const setUpdate = async(e) =>{
        e.preventDefault();
        
        const cursoUpdate = {
            idarea: idarea,
            idcurso: idcurso,
            curso: curso,
            modalidad: modalidad,
            costo: costo
        }
        try{
            await store.collection("cursos").doc(idCatalogo).set(cursoUpdate)
            const {docs} = await store.collection("cursos").get()
            const nuevoArray = docs.map(item =>({id:item.id, ...item.data()}))
            setCursos(nuevoArray)
        }catch(e){
            console.log(e)
        }
            setIdarea("")
            setIdcurso("")
            setCurso("")
            setModalidad("")
            setCosto("")
            setModoEdicion(false)
    }

    return (
            
            
                <div className="contenedor-editor">
                    <div className="edicion-curso"> 
                        <h2>Edicion de Cursos</h2>
                        <form className="form-group" onSubmit={modoEdicion ? setUpdate : setCatalogo}>
                            <input className="form-control" 
                                type="text" 
                                value={idarea}
                                placeholder="Introduce codigo de categoria" 
                                onChange={(e)=>{setIdarea(e.target.value)}}/>
                            <input className="form-control mt-4" 
                                type="text" 
                                value={idcurso}
                                placeholder="Introduce codigo de curso"
                                onChange={(e)=>{setIdcurso(e.target.value)}} />
                            <input className="form-control mt-4" 
                                type="text" 
                                value={curso}
                                placeholder="Introduce nombre de curso" 
                                onChange={(e)=>{setCurso(e.target.value)}}/>
                            <input className="form-control mt-4" 
                                type="text" 
                                value={modalidad}
                                placeholder="Introduce modalidad" 
                                onChange={(e)=>{setModalidad(e.target.value)}}/>
                            <input className="form-control mt-4" 
                                type="text" 
                                value={costo}
                                placeholder="Introduce costo" 
                                onChange={(e)=>{setCosto(e.target.value)}}/>
                                {
                                    modoEdicion ?
                                    (
                                        <input type="submit" value="Editar" className="btn btn-dark btn-block mt-4"/>
                                    )
                                    :
                                    (
                                        <input type="submit" value="Agregar" className="btn btn-dark btn-block mt-4"/>
                                    )
                                }
                            
                        </form>
                    </div>
                        
                    <div className="lista-cursos">
                        <h2>Listado de cursos</h2>
                        <ul>
                            {
                                cursos.length !== 0 ?
                                (
                                    cursos.map( item => (
                                        <li className="list-group-item" key={item.id}>{item.curso} -- {item.modalidad} -- {item.costo}
                                        <button className="btn btn-primary mr-3" onClick={(id)=>{pulsarActualizar(item.id)}}>Actualizar</button>
                                        <button className="btn btn-danger" onClick={(id)=>{BorrarCurso(item.id)}}>Borrar</button></li>

                                    ))
                                )
                                :
                                (
                                    <span>listado vacio</span>
                                )
                            }

                        </ul>
                    </div>
                    
                </div>
    )
}

export default EdicionCatalogo;