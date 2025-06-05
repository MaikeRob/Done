import "./TasksCategoryHeader.css"


function TasksHeaderContainer({headerText, hasButton, onPress}) {

    return (
        <div className="tasks-header-container">
                <p className="header-label">{headerText}</p>
                {hasButton && <button onPress={onPress} className="new-task-button">+</button>}
        </div>
    );
}

export default TasksHeaderContainer;