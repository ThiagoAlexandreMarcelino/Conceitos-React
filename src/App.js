import React,{useState, useEffect} from "react";
import api from '../src/services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(reponse =>{
      setRepositories(reponse.data);
    });
  },[])
  
  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: "Thiago",
      url: "https://asdasdasdasdasdasd",
      techs:["asdasd","asdasdas"]
    })
        
    setRepositories([...repositories, response.data])
        
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
      ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
                 
          {repositories.map( repository => <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
          
          )}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
