import { TasksCategoryHeader, TasksContainer } from "./";
import { Droppable } from "@hello-pangea/dnd";
import "./TasksCategoryContainer.css";

function TasksCategoryContainer({ category, tasks, onChangeTaskContent }) {
  return (
    <div id={category} className="tasks-category-container">
      <TasksCategoryHeader
        headerText={category
          .replace(/-/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())}
        hasButton={category === "to-do"}
      />
      <Droppable droppableId={category}>
        {(provided) => (
          <TasksContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            category={category}
            tasks={tasks}
            onChangeTask={onChangeTaskContent}
          >
            {provided.placeholder}
          </TasksContainer>
        )}
      </Droppable>
    </div>
  );
}

export default TasksCategoryContainer;
