import { useState, forwardRef } from "react";
import "./TasksContainer.css";
import Task from "./Task";

const TasksContainer = forwardRef(({ children, category, tasks, onChangeTaskContent, ...props }, ref) => {


  return (
    <ul className="tasks-container" ref={ref}>
      {tasks
        .slice()
        .sort((a, b) => a.categoryOrder - b.categoryOrder)
        .map((task, index) => (
        <Task
          key={task.id}
          id={task.id}
          index={index}
          title={task.title}
          description={task.description}
          handleUpdateContent={onChangeTaskContent}
        />
      ))}
      {children}
    </ul>
  );
});

export default TasksContainer;



