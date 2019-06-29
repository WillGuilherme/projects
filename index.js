const express = require("express");
const server = express();
server.use(express.json());
let contador = 0;
server.use((req, res, next) => {
  console.log(++contador);
  next();
});

function validarExistenciaProjeto(req, res, next) {
  const { id } = req.params;
  projects.map(project => {
    if (project.id === id) {
      return next();
    }
  });
  res.status(400).json({
    message: "Projeto não encontrado!!!"
  });
}

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  },
  {
    id: "2",
    title: "Novo projeto2",
    tasks: ["Nova tarefa2"]
  }
];
server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;

  projects.push({ id: id, title: title, tasks: tasks });

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", validarExistenciaProjeto, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  projects.map(project => {
    if (project.id === id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

server.delete("/projects/:id", validarExistenciaProjeto, (req, res) => {
  const { id } = req.params;

  projects.map((project, index) => {
    if (project.id === id) {
      projects.splice(index, 1);
    }
  });

  return res.send();
});

server.post("/projects/:id/tasks", validarExistenciaProjeto, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  projects.map(project => {
    if (project.id === id) {
      project.tasks.push(tasks);
    }
  });

  return res.json(projects);
});

server.listen(3000);
