
//Drag and drop tasks

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragMove(event) {
     event.preventDefault();
}

function dragStop(event) {
    event.preventDefault();
    var taskID = event.dataTransfer.getData("text");
    var statusID = event.target.id;
    $('#' + taskID).appendTo($("#" + statusID))
    var taskChangeinfo = {status: statusID, task: taskID}
    console.log(taskChangeinfo);
    //post to server: info on task id (taskID) and the target where the task was moved (status).
    $.post("/api/tasks/:id", taskChangeinfo, function(response) {    
        console.log(response);
    })
}

// Add new tasks in popup widow

    $("#defineNewTaskButton").on("click", function(){
        $("#popup").popup("show");
    });

    $("#addNewTaskButton").on("click", function(){
         let projectID = $("#taskPro").val();
         let name = $("#taskName").val();
         let description = $("#taskDes").val();
         let year = new Date().getFullYear();
         let month = new Date().getMonth() + 1;
         let day = new Date().getDate();
         if (month < 10) {month = "0" + month;};
         let date =  year + "-" + month + "-" + day;
         let defaultStatus = 0;
         let newTaskinfo = {status: defaultStatus, name: name, projectID: projectID, date: date,  description: description} 
         $("#popup").popup("hide");

        // post to server: new task info (status, name projectID, date, and description)
        $.post("/api/tasks", newTaskinfo, function(response) {  
            let newtaskElement = document.createElement("P"); 
            newtaskElement.append(response.name); 
            newtaskElement.setAttribute('ondragstart', 'dragStart(event)');
            newtaskElement.setAttribute('draggable', 'true');
            newtaskElement.setAttribute('id', response.id); 
            $("#0").append(newtaskElement);
        })
    });





