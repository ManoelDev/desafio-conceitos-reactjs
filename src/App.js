import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(()=>{
    async function consultaApi(){
      const response = await api.get('/repositories');
      setRepositories(response.data)
    }
    consultaApi()
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url: "https://github.com/Rocketseat/umbriel",
      title: `Novo Repo ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });
    const repository = response.data
    setRepositories([...repositories, repository])
  }
  async function handleRemoveRepository(id) {
    const repo = repositories;
    await api.delete(`repositories/${id}`);
    const repoIndex = repo.findIndex(repository => repository === id);
    repo.splice(repoIndex, 1)
    setRepositories([...repo])
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(`${repo.id}`)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
