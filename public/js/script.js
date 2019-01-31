
//NIKO
$(function () {
  //Load calendar for current month on load
  var currentTime = new Date();
  var month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
  var year = currentTime.getFullYear();
  monthlyCalendar(month, year);
  $('#monthName').html(monthName(month, year));

  //Change calendar month
  //Right arrow => next month
  $('#calendar-right').on('click', function (event) {
    $(".right").removeClass("visibility");
    $("#myList").empty();
    $("#header").empty();
    if(month == 12){
      month = '01';
      year ++;
    } else {
      month = ('0' + (parseInt(month)+1)).slice(-2);
    }
    monthlyCalendar(month, year);
    $('#monthName').html(monthName(month, year));
  });

  //Left arrow => previous month
  $('#calendar-left').on('click', function (event) {
    $(".right").removeClass("visibility");
    $("#myList").empty();
    $("#header").empty();
    if(month == 1){
      month = '12';
      year --;
    } else {
      month = ('0' + (parseInt(month)-1)).slice(-2);
    }
    monthlyCalendar(month, year);
    $('#monthName').html(monthName(month, year));
  });

  $('#loginSubmit').on('click', function (event) {
    event.preventDefault();
    var $username = $('#loginUser').val();
    var $password = $('#loginPassword').val();
    login($username, $password);
  });
  function login(username, password) {
    var login = { email: username, password: password };
    var json = JSON.stringify(login);
    console.log(json);
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "/api/login",
        "method": "POST",
        "headers": {
            "accept": "application/json",
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": json,
    }).done(function (response) {
        if (response === true) {
            window.location.replace("/calendar");
        } else {
            alert('Väärä käyttäjä tai salasana');
        }
    });
  }

//JANNE

function monthName(month, year){
  var month = (month == 1) ? 'January' : (month == 2) ? 'February' : (month == 3) ? 'March' : (month == 4) ? 'April' : (month == 5) ? 'May' : (month == 6) ? 'June' : (month == 7) ? 'July' : (month == 8) ? 'August' : (month == 9) ? 'September' : (month == 10) ? 'October' : (month == 11) ? 'November' : (month == 12) ? 'December' : '';
  var str = month + ' (' + year + ')';
  return str;
}

function monthlyCalendar(month, year){
  function daysInMonth(year, month) {
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      var daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return daysInMonth[month - 1];
    } else {
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return daysInMonth[month - 1];
    }
  }

  function weekdayStr(year, month, day) {
    var date = new Date(year + '-' + month + '-' + day);
    return (date.getDay());
  }  
  
  var $kalenteri = $('#kalenteriContent');
    $kalenteri.html('');
  
    var rowNum = 1; var j = 1; var l = 1;
    var weekday = weekdayStr(year, month, 01);
  
    var $tr = $('<tr>').attr('id', 'rowNum-' + rowNum);
    var index = daysInMonth(year, month);
    if (month != 1) {
      var lastIndex = daysInMonth(year, month - 1);
    } else {
      var lastIndex = daysInMonth(year - 1, 12);
    }
  
    var k = (weekday == 0) ? lastIndex - 5 : (weekday == 2) ? lastIndex : (weekday == 3) ? lastIndex - 1 : (weekday == 4) ? lastIndex - 2 : (weekday == 5) ? lastIndex - 3 : (weekday == 6) ? lastIndex - 4 : "";
  
    for (var i = 1; i <= index; i++) {
      var $td = $('<td>');
      if (i < weekday) {
        $td.html(k).attr('class', 'grey-month');
        $tr.append($td);
        k++; index++;
      } else {
        $td.html(j);
        $tr.append($td);
        j++;
      }
      if (i % 7 === 0) {
        $tr.attr('id', 'rowNum-' + rowNum);
        $kalenteri.append($tr);
        $tr = $('<tr>');
        rowNum++;
      }
    };
  
    if ((i - 1) % 7 !== 0) {
      while (i % 7 !== 0) {
        var $td = $('<td>');
        $td.html(l).attr('class', 'grey-month');
        l++; i++;
        $tr.append($td);
      }
      var $td = $('<td>').attr('class', 'grey-month');
      $td.html(l);
      $tr.append($td);
    }
  
    $tr.attr('id', 'rowNum-' + rowNum);
    $kalenteri.append($tr);

    //*****
    $('[id^=rowNum]').click(function (e) {
      if (!null && e.target) {
        $('[id^=rowNum]').removeClass("Tablebold");
        $(this).addClass("Tablebold");
        // e.stopPropagation();
        console.log(this.id + " was clicked");
        newID = '#' + this.id
        console.log($(newID).find("td").eq(0).html());
        var dates = [];
        for (var i = 0; i < 7; i++) {
          dates.push(('0' + $(newID).find("td").eq(i).html()).slice(-2));
        }
        console.log(dates);
        //GET REQUEST TO e.target
  
        // month --> gives 01 already: OK
        // year --> gives 2019 already: OK
  
  
        // startDate: 2019-01-14, endDate: 2019-01-14 
  
        // THIS ADDED. NEW CODE
        $("#myList").empty()
        //var cell = row.getElementsByTagName("td")[0];
        var id = 'esimerkki';//cell.innerHTML;
  
        //CREATE THE HEADER TEXT FOR this.week      
        var header = document.getElementById("header");
        header.innerHTML = ("The current week: <br>");
  
        // CREATE A LI ELEMENT FOR WEEKDAYS
        weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
        for (let i = 0; i < weekday.length; i++) {
          var node = document.createElement("DIV");
  
          var weekdaynode = document.createTextNode(year + '-' + month + '-' + dates[i] + ' ' + weekday[i]);
  
          node.setAttribute("id", "weekday_id-" + dates[i]);
          node.appendChild(weekdaynode);
          document.getElementById("myList").appendChild(node);
  
  
        };
      }
    });
}  
  
    /*$('[id^=rowNum]').click(function (e) {
      if (!null && e.target) {
        $('[id^=rowNum]').removeClass("Tablebold");
        $(this).addClass("Tablebold");
        // e.stopPropagation();
        console.log(this.id + " was clicked");
        newID = '#' + this.id
        console.log($(newID).find("td").eq(0).html());
        var dates = [];
        for (var i = 0; i < 7; i++) {
          dates.push(('0' + $(newID).find("td").eq(i).html()).slice(-2));
        }
        console.log(dates);
        //GET REQUEST TO e.target
  
        // month --> gives 01 already: OK
        // year --> gives 2019 already: OK
  
  
        // startDate: 2019-01-14, endDate: 2019-01-14 
  
        // THIS ADDED. NEW CODE
        $("#myList").empty()
        //var cell = row.getElementsByTagName("td")[0];
        var id = 'esimerkki';//cell.innerHTML;
  
        //CREATE THE HEADER TEXT FOR this.week      
        var header = document.getElementById("header");
        header.innerHTML = ("The current week: <br>");
  
        // CREATE A LI ELEMENT FOR WEEKDAYS
        weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
        for (let i = 0; i < weekday.length; i++) {
          var node = document.createElement("DIV");
  
          var weekdaynode = document.createTextNode(year + '-' + month + '-' + dates[i] + ' ' + weekday[i]);
  
          node.setAttribute("id", "weekday_id-" + dates[i]);
          node.appendChild(weekdaynode);
          document.getElementById("myList").appendChild(node);
  
  
        };
      }
    });*/
  
    $('#myList').on('click', function (e) {

        $(".right").addClass("visibility");


        $(e.target).siblings().removeClass("Tablebold");

        $(e.target).addClass("Tablebold");

        $(".taskboard").empty();

      etarg = e.target.innerHTML;
      etarg = etarg.split(' ');
      console.log(etarg[0]);
        


      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/api/projects/" + etarg[0] + "&" + etarg[0],
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }
  
      $.ajax(settings).done(function (response) {
            for (r of response) {
               var tasks = r.tasks;  // taskit yhden projektin yhden päivä = tasks
                for (task of tasks) {
                    let e = document.createElement("DIV"); 
                    e.append(task.taskName); 
                    e.setAttribute('id', task.taskId);
                    e.setAttribute('ondragstart', 'dragStart(event)');
                    e.setAttribute('draggable', 'true');
                    if (task.taskStatus == 0) {
                        $("#0").append(e);
                    } else if (task.taskStatus == 1) {
                        $("#1").append(e);
                    } else if (task.taskStatus == 2) {
                        $("#2").append(e);
                    }
                }
            }
      });
  
    });
  
  });
  


//SATU

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

    var taskChangeinfo = {status: statusid, id: data.id, name: data.content};
    console.log(taskChangeinfo);
    if (event.target.id == "-1") {
        $('#' + data.id).remove();
        $("#task_removed_popup").popup("show");
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:3000/api/delete/" + taskChangeinfo.id, // replace "id" with correct variable name for the current task id to be deleted.
          "method": "DELETE",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": ""
         }
         
         $.ajax(settings).done(function (response) {
          console.log(response); // some response
         });
    }
    else {
        $('#' + data.id).appendTo($("#" + statusid));
        var json = JSON.stringify(taskChangeinfo);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/api/update",
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      "data": json
    }
    
    $.ajax(settings).done(function (response) {
      console.log('ok!');
    });

    }
    //post to server info on task id, target and content.

    
} 
    

// Add new tasks in popup widow

    $("#defineNewTaskButton").on("click", function(){
        $("#popup").popup("show");
        //Ask current projects from server

       var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/api/projects/all",
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      }

      $.ajax(settings).done(function (response) {
        $('#selector').empty();
        for (project of response) {
          let option  = document.createElement("OPTION");
          option.setAttribute('value', project.projectName);
          option.setAttribute('id', 'project-' + project.projectId); // remember to split at '-'
          $(option).html(project.projectName);
          $(option).appendTo($("#selector"));
        }
      });
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
         //let newTaskinfo = '{"status":' + defaultStatus + ', "name":' + name + ', "projectID":' + parseInt(projectID) + ', "date":' + date + ',  "description":' + description} 
         let newTaskinfo = {"status": defaultStatus, "name": name, "projectID": parseInt(projectID), "date": etarg[0],  "description": description} 
         newTaskinfo = JSON.stringify(newTaskinfo)
         console.log(newTaskinfo);
         $("#popup").popup("hide");

        // post to server new task info on status, name projectID, date, and description.
         var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/api/tasks",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
            "processData": false,
            "data": newTaskinfo
           }
           
           $.ajax(settings).done(function (response) {
                //get pyyntö tähän
                $(".taskboard").empty();

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:3000/api/projects/" + etarg[0] + "&" + etarg[0],
                    "method": "GET",
                    "headers": {
                      "cache-control": "no-cache"
                    }
                  }
              
                  $.ajax(settings).done(function (response) {
                        for (r of response) {
                           var tasks = r.tasks;  // taskit yhden projektin yhden päivä = tasks
                            for (task of tasks) {
                                let e = document.createElement("DIV"); 
                                e.append(task.taskName); 
                                e.setAttribute('id', task.taskId);
                                e.setAttribute('ondragstart', 'dragStart(event)');
                                e.setAttribute('draggable', 'true');
                                if (task.taskStatus == 0) {
                                    $("#0").append(e);
                                } else if (task.taskStatus == 1) {
                                    $("#1").append(e);
                                } else if (task.taskStatus == 2) {
                                    $("#2").append(e);
                                }
                            }
                        }
                  });
            })
    });





