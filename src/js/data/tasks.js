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

    static addTask(title = '', description = '', status = 'todo') {
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

    static removeTask(id) {
        this.tasksMap.delete(id);
    }
}

DataTaskManager.addTask('Tarefa 1', 'Descrição da tarefa 1', 'InProgress');
DataTaskManager.addTask('Tarefa 2', 'Descrição da tarefa 2', 'Done');
DataTaskManager.addTask('Tarefa 2', 'Descrição da tarefa 2', 'todo');
DataTaskManager.addTask('Tarefa 2', 'Descrição da tarefa 2');
DataTaskManager.addTask('Tarefa 2', 'Descrição da tarefa 2');


