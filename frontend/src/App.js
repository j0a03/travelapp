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
        <Form
          travel={travel}
          setTravel={setTravel}
          EnvioFormulario={EnvioFormulario}        
        />
      <div className='cards'>
        {
          viagens.map(v=>
            <Card
              nome={v.nome}
            />
          )
        }
        </div>
      </div>
  )
}
export default App