

//Drag and drop tasks

function dragStart(event) {
    event.dataTransfer.setData("text/plain",  event.target.id);
}

function dragMove(event) {
    event.preventDefault();
}

function dragStop(event) {
    event.preventDefault();
    var taskID = event.dataTransfer.getData("text/plain");
    event.target.appendChild(document.getElementById(taskID));
    var info = {status: event.target.id, taskID: taskID}
    console.log(info.status);
    console.log(info.taskID);
    //post server info on task id (taskID) and the target where the task was moved (status).
    $.post("/palvelin", info, function(response) {    
        console.log(response);
    })
}


