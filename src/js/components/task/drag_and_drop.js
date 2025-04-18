import { DataTaskManager } from "../../data/tasks";


let dragState = {
    activeTask: null,
    startX: 0,
    startY: 0,
};

function getClosestDropZone(activeTask) {

    const dropZones = document.querySelectorAll('.tasks-category-container');

    const deleteDropZone = document.querySelector('#delete-container');
    const deleteDropZoneRect = deleteDropZone.getBoundingClientRect();

    const taskRect = activeTask.getBoundingClientRect();


    if(
        taskRect.left < deleteDropZoneRect.right &&
        taskRect.right > deleteDropZoneRect.left &&
        taskRect.top < deleteDropZoneRect.bottom &&
        taskRect.bottom > deleteDropZoneRect.top
    ) {
        return deleteDropZone;
    }

    for( let dropZone of dropZones) {
        const dropZoneRect = dropZone.getBoundingClientRect();

        if(
            taskRect.left < dropZoneRect.right &&
            taskRect.right > dropZoneRect.left &&
            taskRect.top < dropZoneRect.bottom &&
            taskRect.bottom > dropZoneRect.top
        ) {
            const dropZoneTaskContainer = dropZone.querySelector('.tasks-container');
            return dropZoneTaskContainer;
        }

    }


    return null;

}

function changeTaskCategoty(task, dropTaskContainer) {

    const categoryOfTask = task.parentElement.parentElement.id;
    const categoryOfDropTaskContainer = dropTaskContainer.parentElement.id;

    if (categoryOfTask === categoryOfDropTaskContainer) {
        return;
    }

    const taskFrame = task.parentElement;

    taskFrame.parentElement.removeChild(taskFrame);

    dropTaskContainer.appendChild(taskFrame);

    const taskId = task.id;

    DataTaskManager.changeTaskStatus(taskId, categoryOfDropTaskContainer);
}


const onMouseMove = (event) => {
    if (dragState.activeTask) {
        event.preventDefault();

        const dx = event.clientX - dragState.startX;
        const dy = event.clientY - dragState.startY;

        const activeTaskRect = dragState.activeTask.getBoundingClientRect();
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        if(
            activeTaskRect.left < 5 ||
            activeTaskRect.right > maxWidth-5 ||
            activeTaskRect.top < 5 ||
            activeTaskRect.bottom > maxHeight-5
        ) {
            return;
        }

        dragState.activeTask.style.left = `${dx}px`;
        dragState.activeTask.style.top = `${dy}px`;

    }
};

const onMouseUp = (event) => {
    if(dragState.activeTask) {
        event.preventDefault();

        const tasksContainer = dragState.activeTask.parentElement.parentElement;
        const deleteContainer = document.getElementById('delete-container');
        const dropZone = getClosestDropZone(dragState.activeTask);

        if(dropZone.id === 'delete-container'){
            DataTaskManager.removeTask(dragState.activeTask.id);
            dragState.activeTask.parentElement.remove();
        } else {
            changeTaskCategoty(dragState.activeTask, dropZone);
        }

        tasksContainer.classList.toggle('dragging-task');
        deleteContainer.classList.toggle('active');
        dragState.activeTask.classList.toggle('dragging');
        dragState.activeTask.style.left = `0px`;
        dragState.activeTask.style.top = `0px`;


        dragState.activeTask = null;
        dragState.startX = 0;
        dragState.startY = 0;

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

};

export function setupDragAndDrop(task) {

    task.addEventListener('mousedown', (event) => {

        if (event.target !== task) {
            return;
        }

        event.preventDefault();

        const tasksContainer = task.parentElement.parentElement;
        const deleteContainer = document.getElementById('delete-container');

        deleteContainer.classList.toggle('active');
        tasksContainer.classList.toggle('dragging-task');
        task.classList.toggle('dragging');


        dragState.activeTask = task;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });

}
