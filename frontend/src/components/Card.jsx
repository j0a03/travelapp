import "./Card.css"
import {BsFillTrashFill} from 'react-icons/bs'
function Card(props){
    return (
        <div className="card">
            <h1>{props.nome}</h1>
            <div>
            <BsFillTrashFill size={32}/>
            </div>
        </div>
    )
}

export default Card