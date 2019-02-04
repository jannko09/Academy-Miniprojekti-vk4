class ClientTask {
    constructor(project, task, day) {
        this.projectName = project.name;
        this.projectId = project.id;
        this.projectColor = project.color;
        this.projectTeam = project.team;
        this.taskDate = day.date;
        this.taskName = task.name;
        this.taskId = task.id;
        this.taskDescription = task.description;
        this.taskStatus = task.status;
    }
}

module.exports = {ClientTask: ClientTask};