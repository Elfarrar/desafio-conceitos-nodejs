const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id:uuid(), title, url, techs, likes: 0};

  repositories.push(repositorie); 

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repo => repo.id === id );

  if(repositorieIndex < 0){
    return response.status(400).json({error: 'Repositório não encontrado!'});
  }

  repositories[repositorieIndex].title = title;
  repositories[repositorieIndex].url = url;
  repositories[repositorieIndex].techs = techs;

  return response.json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(p => p.id === id );
  
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'Projeto não encontrado'});
  }

  repositories.splice(repositorieIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex(repo => repo.id === id );

  if(repositorieIndex < 0){
    return response.status(400).json({error: 'Repositório não encontrado!'});
  }

  repositories[repositorieIndex].likes += 1;
  
  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
