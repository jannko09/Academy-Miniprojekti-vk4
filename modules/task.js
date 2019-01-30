class Task{
    constructor(task){
        this.name = task.name;
        this.description = task.description;
        this.status = task.status;
        this.id = Date.now();
    }
}

module.exports = {Task: Task};