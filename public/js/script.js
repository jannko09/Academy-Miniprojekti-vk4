
//Drag and drop tasks

function dragStart(event) {
    var taskid = event.target.id;
    var content = $("#" + taskid).html();
    var data = '{"id":' + taskid + ', "content":"' + content + '"}';
    event.dataTransfer.setData("json", data);
}

function dragStop(event) {
    event.preventDefault();
    var data = JSON.parse(event.dataTransfer.getData("json"));
    var statusid = event.target.id;
    var taskChangeinfo = {status: statusid, id: data.id, name: data.content}
    console.log(taskChangeinfo);
    if (event.target.id == "-1") {
        $('#' + data.id).remove();
        $("#task_removed_popup").popup("show");
    }
    else {
        $('#' + data.id).appendTo($("#" + statusid))
    }
    //post to server info on task id, target and content.
    $.post("./api/tasks/:id", taskChangeinfo, function(response) {    
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

        // post to server new task info on status, name projectID, date, and description.
        $.post("./api/tasks", newTaskinfo, function(response) {  
            let newtaskElement = document.createElement("P"); 
            newtaskElement.append(response.name); 
            newtaskElement.setAttribute('ondragstart', 'dragStart(event)');
            newtaskElement.setAttribute('draggable', 'true');
            newtaskElement.setAttribute('id', response.id); 
            $("#0").append(newtaskElement);
        })
    });





