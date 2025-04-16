import crypto from 'crypto';

class Task {
    constructor(title, description) {
        this.id = Math.random().toString(36).substring(2);
        this.title = title;
        this.description = description;
        this.status = '';
    }
}

export class DataTaskManager {

    static tasksMap = new Map();

    static getTasks() {
        return this.tasksMap;
    }

    static getTask(id) {
        return this.tasksMap.get(id);
    }

    static addTask(title = '', description = '', status = 'to-do') {
        const task = new Task(title, description);
        this.tasksMap.set(task.id, task);
        task.status = status;
        return task.id;
    }

    static editTask(id, title, description) {
        const task = this.tasksMap.get(id);
        task.title = title;
        task.description = description;
    }

    static changeTaskStatus(id, status) {
        const task = this.tasksMap.get(id);
        task.status = status;
    }

    static removeTask(id) {
        this.tasksMap.delete(id);
    }
}

DataTaskManager.addTask('Task 1', 'Description 1', 'to-do');
DataTaskManager.addTask('Task 2', 'Description 2', 'in-progress');
DataTaskManager.addTask('Task 3', 'Description 3', 'done');