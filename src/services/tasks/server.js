//import jsonServer from 'json-server';

//const jsonServer = require('json-server');


const server = jsonServer.create();
const router = jsonServer.router("tasks.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((requisition, response, next) => {
    if( (requisition.method === 'POST' || requisition.method === 'PUT') && requisition.headers['x-reorganize-tasks'] === 'true') {
        const db = router.db;
        const tasks = db.get('tasks').value();

        const sourceCategory = req.headers["x-previous-status"];
        const sourceCategoryOrder = req.headers["x-previous-order"];
        const destinationCategory = requisition.body.status;
        const destinationCategoryOrder = requisition.body.categoryOrder;
        
        // Movimentação na mesma categoria
        if(sourceCategory === destinationCategory) {
            const tasksInSourceCategory = tasks.filter(task => task.status === sourceCategory);
            const taskToMove = tasksInSourceCategory[sourceCategoryOrder];

            tasksInSourceCategory = tasksInSourceCategory.filter(task => task.id !== taskToMove.id);

            tasksInSourceCategory.splice(destinationCategoryOrder, 0, taskToMove);

            tasksInSourceCategory.map((task, index) => ({ ...task, categoryOrder: index}));

            db.set('tasks', tasks).write();
        }

    }
    next();
});