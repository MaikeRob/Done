import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Draggable } from "@hello-pangea/dnd";
import "./Task.css";

function Task({ index, id, title, description, handleUpdateContent }) {
  const titleContent = useRef(title || "");
  const descriptionContent = useRef(description || "");

  const placeholderTitle = "Título";
  const placeholderDescription = "Descrição";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <li
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ContentEditable
            className="task-title"
            html={titleContent.current}
            onChange={(e) => {
              titleContent.current = e.target.value;
              handleUpdateContent({ taskId: id, newTitle: titleContent.current});
            }}
            data-placeholder={placeholderTitle}
          />
          <ContentEditable
            className="task-description"
            html={descriptionContent.current}
            onChange={(e) => {
              descriptionContent.current = e.target.value;
              handleUpdateContent({ taskId: id, newDescription: descriptionContent.current});
            }}
            data-placeholder={placeholderDescription}
          />
        </li>
      )}
    </Draggable>
  );
}

export default Task;
