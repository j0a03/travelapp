import "./Card.css"
import {BsFillTrashFill} from 'react-icons/bs'
import { FormatarData } from "../fn-helpers/Data"
import { useState } from "react"
import {FiEdit} from "react-icons/fi"

function Card(props){
  const {id, data, desc, price} = props
  const dataFormatada = FormatarData(data);
  const [isDelete, setIsDelete] = useState(false)
  const deleteMode=()=>{
    setIsDelete(true);
    setTimeout(()=>{
      props.deletarViagem(id)
    },700)
    props.setEditID(null)
   
  }
  const setEditing = ()=>{
    props.setTravel({
      nome: props.nome,
      data: data.slice(0, 16),
      desc: desc,
      price: price
    })
    props.setEditID(id)
  }
    return (
        <div className={isDelete? 'card disappear' : 'card'}>
            <h1>{props.nome}</h1>
            <div>
              <p>{dataFormatada}</p>
              <p>{desc}</p>
              <p>{price}</p>
              <img
                src={props.image_url}
                alt={props.nome}
                className="imageViagem"
              />
            </div>
            <div className="lixeira" >
              <div className="btns">
                <div
                  onClick={()=>deleteMode()}
                  id="trashDelete"
                  className="icons"
                >
                  <BsFillTrashFill size={32}/>
                </div>
              <div onClick={()=>setEditing()} className="icons">
                <FiEdit size={32}/>

              </div>
              </div>

            </div>
        </div>
    )
}

export default Card