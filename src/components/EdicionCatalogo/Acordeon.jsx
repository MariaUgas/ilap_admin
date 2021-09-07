import { Accordion } from 'react-bootstrap';
import ItemAcordeonArea from '../ItemAcordeonArea/ItemAcordeonArea.jsx';


function Acordeon(){
    
return(


<div className="contenedor-cursos" id="cursos-id">

    <h3 className="titulo">TE OFRECEMOS:</h3>
        <Accordion flush >
        <ItemAcordeonArea />
        </Accordion>
    </div>


    )
}

export default Acordeon;