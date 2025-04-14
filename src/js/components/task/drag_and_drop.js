

let dragState = {
    activeTask: null,
    startX: 0,
    startY: 0,
}

function getClosestDropZone(activeTask) {
    const dropZones = document.querySelectorAll('.tasks-category-container');

    const taskRect = activeTask.getBoundingClientRect();

    dropZones.forEach((dropZone) => {
        const dropZoneRect = dropZone.getBoundingClientRect();

        if(
            taskRect.left < dropZoneRect.right &&
            taskRect.right > dropZoneRect.left &&
            taskRect.top < dropZoneRect.bottom &&
            taskRect.bottom > dropZoneRect.top 
        ) {

            console.log(dropZone);
            return dropZone;
        }
    })

    
}


const onMouseMove = (event) => {
    if (dragState.activeTask) {
        event.preventDefault();     

        const dx = event.clientX - dragState.startX;
        const dy = event.clientY - dragState.startY;
        
        dragState.activeTask.style.left = `${dx}px`;
        dragState.activeTask.style.top = `${dy}px`;

        //console.log(dragState.activeTask.style.left);
    }
};

const onMouseUp = (event) => {
    if(dragState.activeTask) {
        event.preventDefault(); 
        dragState.activeTask.classList.toggle('dragging');
        dragState.activeTask.style.left = `0px`;
        dragState.activeTask.style.top = `0px`;

        //const dropZone = getClosestDropZone();
        console.log(dragState.activeTask);

        console.log(getClosestDropZone(dragState.activeTask));

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
