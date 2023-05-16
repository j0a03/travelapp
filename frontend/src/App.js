import axios from 'axios'
import {useState,useEffect} from 'react';
import Form from './components/Form';
import Card from './components/Card';
function App(){
  const [travel,setTravel] = useState({
    nome: '',
    data: '',
    price: 0,
    desc: ''
  })
  const [viagens,setViagens] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/api/v1/travels")
      .then(res=>setViagens(res.data))
      .catch(erro=> setViagens("deu erro no getAPI: ",erro))
  },[])
  const [editID,setEditID] = useState(-1)
  const cadastrarViagem=(travel)=>{
    axios.post("http://localhost:3001/api/v1/travels",{travel})
      .then(res=>{
        console.log(res.data);
        setViagens([...viagens,res.data])
      })

 
  } 
  const deleteTravel = (id)=>{
    axios.delete(`http://localhost:3001/api/v1/travels/${id}`)
    .then(res=>{
      console.log(res.data)
      setViagens(viagens.filter(v => v.id === id))
    })
    .catch(error=>console.error("erro ao deletar"))
  }
  const editTravel = (id,travel)=>{
    axios.put(`http://localhost:3001/api/v1/travels/${id}`,{travel})
      .then(res=>console.log(res))
      .catch(erro=>console.log("erro atualizado"))
  }
  function EnvioFormulario(e){
    e.preventDefault()
    if(editID !== -1){
      console.log("era para estar editando")
      editTravel(editID,travel)
      setEditID(-1)
      setTravel({
        nome: '',
        data: '',
        desc: '',
        price: ''
      })
      return
    }
    cadastrarViagem(travel)
  }

  return(
      <div>
        <Form
          id={editID}
          travel={travel}
          setTravel={setTravel}
          EnvioFormulario={EnvioFormulario}        
        />
      <div className='cards'>
        {
          viagens.map(v=><Card
          key={v.id}
            setTravel={setTravel}
            deletarViagem = {deleteTravel}
            nome={v.nome}
            id={v.id}
            data={v.data}
            desc={v.desc}
            price={v.price}
            setEditID={setEditID}
          />)
        }
        </div>
      </div>
  )
}
export default App