import { DataTaskManager } from "../../data/tasks";


let dragState = {
    activeTask: null,
    startX: 0,
    startY: 0,
};

function getClosestDropZone(activeTask) {

    const dropZones = document.querySelectorAll('.tasks-category-container');

    const taskRect = activeTask.getBoundingClientRect();

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

        dragState.activeTask.style.left = `${dx}px`;
        dragState.activeTask.style.top = `${dy}px`;

    }
};

const onMouseUp = (event) => {
    if(dragState.activeTask) {
        event.preventDefault();
        
        const dropZone = getClosestDropZone(dragState.activeTask);
        changeTaskCategoty(dragState.activeTask, dropZone);

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
        event.preventDefault(); 

        task.classList.toggle('dragging');

        dragState.activeTask = task;
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });

}
