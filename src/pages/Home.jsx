import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { TasksCategoryContainer } from "../components";
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
  const [tasks, setTasks] = useState(temporaryTasks);

  const toDotasks = tasks.filter((task) => task.status === "to-do");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  function onChangeTaskContent({ taskId, newTitle, newDescription }) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            title: newTitle !== undefined ? newTitle : task.title,
            description:
              newDescription !== undefined ? newDescription : task.description,
          };
        } else {
          return task;
        }
      })
    );
  }

  function onDragEnd(result) {

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
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

    useEffect(() => {
      console.log("Tasks updated:", tasks);
    }, [onDragEnd]);

  function onBeforeCapture() {}

  function onDragStart() {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main>
        <TasksCategoryContainer
          category="to-do"
          tasks={toDotasks}
          onChangeTask={onChangeTaskContent}
        />
        <TasksCategoryContainer
          category="in-progress"
          tasks={inProgressTasks}
          onChangeTask={onChangeTaskContent}
        />
        <TasksCategoryContainer
          category="done"
          tasks={doneTasks}
          onChangeTask={onChangeTaskContent}
        />
      </main>
    </DragDropContext>
  );
}

export default Home;
