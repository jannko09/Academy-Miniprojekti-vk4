var express = require('express');
var router = express.Router();
var fs = require('fs');
var clientTask = require('../modules/clienttask');
var ClientTask = clientTask.ClientTask;
var task = require('../modules/task');
var Task = task.Task;

/* GET user's all projects */
router.get('/projects/all', function (req, res) {

  // Get user id from session info
  let userID = 1;     // change later (req.session.userID)

  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);

  //userIndex
  for (let i in users) {
    if (users[i].id === userID) {
      var user = i;
      break;
    }
  };

  let projects = users[user].projects;

  projectArray = [];
  for(project of projects){
    projectArray.push({"projectName":project.name, "projectId": project.id});
  }

  console.log(projectArray);
  res.json(projectArray);
});

/* GET user's all projects and tasks for specific date range */
router.get('/projects/:startDate&:endDate', function (req, res) {

  // Get user id from session info
  let userID = 1;     // change later (req.session.userID)

  let startDate = new Date(req.params.startDate);
  let endDate = new Date(req.params.endDate);
  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);

  //userIndex
  for (let i of users) {
    if (i.id === userID) {
      var user = i;
      break;
    }
  };

  let taskArray = [];
  for (let project of user.projects) {
    for (let day of project.dates) {
      let date = new Date(day.date);
      if (date >= startDate && date <= endDate) {
        let dailyTasks = { "date": day.date, tasks: [] };
        for (let t of day.tasks) {
          let task = new ClientTask(project, t, day);
          dailyTasks.tasks.push(task);
        }
        taskArray.push(dailyTasks);
      }
    }
  }
  res.json(taskArray);
});

/* POST new task */
router.post('/tasks', function (req, res) {

  // Get user id from session info
  let userID = 1;                               // change later (req.session.userID)
  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);

  //User Index
  for (let i in users) {
    if (users[i].id === userID) {
      var user = users[i];
      userIndex = i;
      break;
    }
  };

  //Project index
  let projects = users[userIndex].projects;
  let projectIndex = -1;
  for(let i in projects){
    if(projects[i].id === req.body.projectID){
      projectIndex = i;
      break;
    }
  }

  let task = new Task(req.body);

  let dates = users[userIndex].projects[projectIndex].dates;
  let index = -1;
  //let dateArray = [];
  for(let i in dates){
    if(dates[i].date === req.body.date){
      index = i;
      //add date to dateArray
      break;
    }
  }

  // loop through each day
    // *****users[userIndex].projects[projectIndex].dates
    //if date is ... then
      if (index > -1) {
        users[userIndex].projects[projectIndex].dates[index].tasks.push(new Task(task));
      } else if (index === -1) {
        let dailyTasks = { "date": req.body.date, tasks: [] };
        dailyTasks.tasks.push(new Task(task));
        users[userIndex].projects[projectIndex].dates.push(dailyTasks);
      }

  var data = JSON.stringify(users);
  fs.writeFileSync('./json/users.json', data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.send(users);
});

router.put('/update', function (req, res) {
  let task = req.body; // status, id ,name
  let userID = 1;     
  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);

  for (let i in users) {
    if (users[i].id === userID) {
      userIndex = i;
      break;
    }
  };
  
  let projects = users[userIndex].projects;
  for (let project in projects) {
    for (let d in projects[project].dates) {
      for (let t in projects[project].dates[d].tasks) {
        if (projects[project].dates[d].tasks[t].id === task.id){
          //IF id = -1 DELETE
          
          //ELSE
          users[userIndex].projects[project].dates[d].tasks[t].status = task.status;
        }
      }
    }
  }

  var data = JSON.stringify(users);
  fs.writeFileSync('./json/users.json', data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.send(users);
});


// DELETE TASK
router.delete('/delete/:id', function (req, res) {
  let id = req.params.id;
  console.log(id);
  let userID = 1;
  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);
 
  for (let i in users) {
    if (users[i].id === userID) {
      userIndex = i;
      break;
    }
  };

  let projects = users[userIndex].projects;
  for (let project in projects) {
    for (let d in projects[project].dates) {
      for (let t in projects[project].dates[d].tasks) {
        if (projects[project].dates[d].tasks[t].id == id){
          users[userIndex].projects[project].dates[d].tasks.splice(t, 1);
        } else {
          console.log('Task id not found... Line 167: api.js')
        }
      }
    }
  }

  var data = JSON.stringify(users);
  fs.writeFileSync('./json/users.json', data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.send(users);

 });

module.exports = router;
