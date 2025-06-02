import "./TasksCategoryHeader.css"


function TasksHeaderContainer({headerText, hasButton}) {

    return (
        <div className="tasks-header-container">
                <p className="header-label">{headerText}</p>
                {hasButton && <button className="new-task-button">+</button>}
        </div>
    );
}

export default TasksHeaderContainer;