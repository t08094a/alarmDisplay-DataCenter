module.exports = (app) => {
  const AlarmInfo = require('../controllers/alarm-info.controller.js');
  AlarmInfo.initialize(app);

  // Create a new alarm-info
  app.post('/alarm-info', AlarmInfo.create);

  // Retrieve all alarm-info
  app.get('/alarm-info', AlarmInfo.findAll);

  // Retrieve a single alarm-info with alarmId
  app.get('/alarm-info/:alarmId', AlarmInfo.findOne);

  // Update a alarm-info with alarmId
  app.put('/alarm-info/:alarmId', AlarmInfo.update);

  // Delete a alarm-info with alarmId
  app.delete('/alarm-info/:alarmId', AlarmInfo.delete);
}
