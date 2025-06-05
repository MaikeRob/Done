import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { TasksCategoryContainer } from "../components";
import tasksService from "../services/tasks/tasks";
import "./Home.css";

const temporaryTasks = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    status: "to-do",
    categoryOrder: 0,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    status: "in-progress",
    categoryOrder: 0,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    status: "done",
    categoryOrder: 0,
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description 4",
    status: "to-do",
    categoryOrder: 1,
  },
  {
    id: "5",
    title: "Task 5",
    description: "Description 5",
    status: "in-progress",
    categoryOrder: 1,
  },
  {
    id: "6",
    title: "Task 6",
    description: "Description 6",
    status: "done",
    categoryOrder: 1,
  },
];

function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await tasksService.getTasks();
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar tarefas", error);
        setError("Erro ao buscar tarefas!");
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  if (isLoading) {
    return <div className="loading">Carregando tarefas...</div>;
  }


  const toDotasks = tasks.filter((task) => task.status === "to-do");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  async function onChangeTaskContent({ taskId, newTitle, newDescription }) {

    const updatedData = {}

    if (newTitle !== undefined) updatedData.title = newTitle;
    if (newDescription !== undefined) updatedData.description = newDescription;

    try {
      await tasksService.editTask(taskId, updatedData);
    } catch (error) {
      console.error("Erro ao editar tarefa", error);
      setError("Erro ao editar tarefa!");
    }

    // setTasks((prevTasks) =>
    //   prevTasks.map((task) => {
    //     if (task.id === taskId) {
    //       return {
    //         ...task,
    //         title: newTitle !== undefined ? newTitle : task.title,
    //         description:
    //           newDescription !== undefined ? newDescription : task.description,
    //       };
    //     } else {
    //       return task;
    //     }
    //   })
    // );

  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    console.log("Drag result:", result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === draggableId) {
          return {
            ...task,
            status: destination.droppableId,
            categoryOrder: destination.index,
          };
        } else {
          return task;
        }
      })
    );
  }

  function onBeforeCapture() {}

  function onDragStart() {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main>
        <TasksCategoryContainer
          category="to-do"
          tasks={toDotasks}
          onChangeTaskContent={onChangeTaskContent}
        />
        <TasksCategoryContainer
          category="in-progress"
          tasks={inProgressTasks}
          onChangeTaskContent={onChangeTaskContent}
        />
        <TasksCategoryContainer
          category="done"
          tasks={doneTasks}
          onChangeTaskContent={onChangeTaskContent}
        />
      </main>
      {error && <div className="error-message">{error}</div>}
    </DragDropContext>
  );
}

export default Home;
