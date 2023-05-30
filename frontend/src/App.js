import axios from 'axios'
import {useState,useEffect} from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Popup from './components/Popup';
function App(){
  const [travel,setTravel] = useState({
    nome: '',
    data: '',
    price: 0,
    desc: '',
    image: null
  })
  const[showPopup,setShowPopup] = useState(false);
  const [viagens,setViagens] = useState([]);
  const [popupContent,setPopupContent] = useState({message: '',color: ''})

  function showAndHidePopup(){
    setShowPopup(true);
    setTimeout(()=>{
      setShowPopup(false);
    },3500)
  }
  useEffect(()=>{
    axios.get("http://localhost:3001/api/v2/travels")
      .then(res=>setViagens(res.data))
      .catch(erro=> setViagens("deu erro no getAPI: ",erro))
  },[])
  const [editID,setEditID] = useState(-1)
  const cadastrarViagem=(formData)=>{
    axios.post("http://localhost:3001/api/v2/travels",formData,{
      headears: {
        'Content-Type' : 'multipart/form-data',
      },
    })
      .then(res=>{
        console.log(res.data);
        setViagens([...viagens,res.data])
        setTravel({
          nome: '',
          data: '',
          price: '',
          desc: '',
          image: null
        })
        setPopupContent({
          message: 'Ossecus moc odartsadaC draC',
          color: 'success'
        })
        showAndHidePopup()
      })
      .catch(erro=>{
        console.log(erro)
        setPopupContent({
          message: 'rartsadac oa orre',
          color: 'warning'
        })
        showAndHidePopup()

      })
 
  } 
  const deleteTravel = (id)=>{
    axios.delete(`http://localhost:3001/api/v2/travels/${id}`)
    .then(res=>{
      console.log(res.data)
      setViagens(viagens.filter(v => v.id === id))
      setPopupContent({
        message: 'Ossecus moc odateleD draC',
        color: 'success'
      })
      showAndHidePopup()
    })
    .catch(error=>{
      console.error("erro ao deletar")
      setPopupContent({
        message: 'rateled levissop iof oãN',
        color: 'warning'
      })
      showAndHidePopup()
    })
  }
  const editTravel = (id,travel)=>{
    axios.put(`http://localhost:3001/api/v2/travels/${id}`,{travel})
      .then(res=>{
        let newListaDeViagens = viagens.map ( v=>{
          if(v.id === id){
            return res.data
          }
          return v
        })
        setViagens(newListaDeViagens)
        setPopupContent({
          message: 'Ossecus moc adatidE draC',
          color: 'success'
        })
        showAndHidePopup()
      })
      .catch(erro=>{
        console.log(erro);
        setPopupContent({
          message: 'ratidE oa orre',
          color: 'warning'
        })


      })
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
    const formData = new FormData();
    formData.append('travel[image]',travel.image)
    formData.append('travel[nome]',travel.nome)
    formData.append('travel[desc]',travel.desc)
    formData.append('travel[price]',travel.price)
    formData.append('travel[data]',travel.data)
    cadastrarViagem(formData)
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
            image_url={v.image_url}
          />)
        }
        {
         showPopup ?
          <Popup
          message={popupContent.message}
          color={popupContent.color}
          />
          : null
        }
        </div>
      </div>
  )
}
export default App