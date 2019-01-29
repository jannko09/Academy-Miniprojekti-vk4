var express = require('express');
var router = express.Router();
var fs = require('fs');
var clientTask = require('../modules/clienttask');
var ClientTask = clientTask.ClientTask;

/* GET user's all projects and tasks */
router.get('/projects/all', function (req, res) {

  // Get user id from session info
  let userID = 1;     // change later (req.session.userID)

  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);
  console.log(users);
  res.json(users);
});

/* GET user's all projects and tasks for specific date */
router.get('/projects/:startDate&:endDate', function (req, res) {

  // Get user id from session info
  let userID = 1;     // change later (req.session.userID)

  let startDate = new Date(req.params.startDate);
  let endDate = new Date(req.params.endDate);
  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);

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


module.exports = router;
