import "./Card.css"
import {BsFillTrashFill} from 'react-icons/bs'
function Card(props){
  const {id, data, desc, price} = props
    return (
        <div className="card">
            <h1>{props.nome}</h1>
            <div>
              <p>{data}</p>
              <p>{desc}</p>
              <p>{price}</p>
            </div>
            <div className="lixeira" >
              <button onClick={()=>props.deletarViagem(id)}>
                <BsFillTrashFill size={32}/>
              </button>
            </div>
        </div>
    )
}

export default Card