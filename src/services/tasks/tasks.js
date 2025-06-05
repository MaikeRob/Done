import axios from "axios";

const API_BASE_URL = "http://localhost:3000/tasks";

async function getTasks() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao requisitar tarefas:", error);
    throw error;
  }
}

async function editTask(taskId, updatedData) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${taskId}`,
      updatedData
    );
    console.log(`Tarefa de id ${taskId} editada com sucesso`);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    throw error;
  }
}

async function moveTask(taskId, { source, destination }) {
    
    // O middleware reoganiza as tarefas no servidor, então não é necessário fazer isso aqui.
  const header = {
    headers: {
      "x-reorganize-tasks": "true",
      "x-previous-status": source.droppableId,
      "x-previous-order": source.index,
    },
  };

  const updatedData = {
    status: destination.droppableId,
    categoryOrder: destination.index,
  };

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${taskId}`,
      updatedData,
      header
    );
    console.log(`Tarefa de id ${taskId} movida com sucesso`);
    return response.data;
  } catch (error) {
    console.error("Erro ao mover tarefa:", error);
    throw error;
  }
}

export default { getTasks, editTask, moveTask };
