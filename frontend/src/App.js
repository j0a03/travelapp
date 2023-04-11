import axios from 'axios'
import {useState,useEffect} from 'react';

function App(){
  const [viagens,setViagens] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001/api/v1/travels")
      .then(res=>setViagens(res.data))
      .catch(erro=> setViagens("deu erro no getAPI: ",erro))
  },[])

  return(
      <div>App</div>
  )
}
export default App