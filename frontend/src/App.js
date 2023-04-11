import axios from 'axios'
import {useState,useEffect} from 'react';

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

  const cadastrarViagem=(travel)=>{
    axios.post("http://localhost:3001/api/v1/travels",{travel})
      .then(res=>{
        console.log(res.data);
        setViagens([...viagens,res.data])
      })

 
  } 
  function EnvioFormulario(e){
    e.preventDefault()
    cadastrarViagem(travel)
  }
  return(
      <div>
        <form onSubmit={EnvioFormulario}>
          <label>Nome</label>
          <input
            id="nome"
            required
            onChange={(e)=>setTravel({...travel,nome: e.target.value})}
            value={travel.nome}
            placeholder='Digite o nome da viagem'
          />
          <button type='submit'>Cadastrar Viagem</button>
        </form>
        {
          viagens.map(v=>
            <h1>{v.nome}</h1>
          )
        }
      </div>
  )
}
export default App