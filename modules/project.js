class Project{
    constructor(name, description, date, projectID, creator){
        this.name = name;
        this.description = description;
        this.created = date;
        this.id = projectID;
        this.creator = creator;
        this.color = 'not availabe';
        this.status = 0;
        this.deadline = 0;
        this.team = [creator];
        this.dates = [];
    }
}

module.exports = {Project: Project};


// users[user].projects.push(new Project(newProject.name, newProject.description, newProject.date, (users[user].projects.length+1), userID));