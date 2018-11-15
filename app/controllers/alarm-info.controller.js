const AlarmInfo = require('../models/alarm-info.model.js');

let _socketPublisher;

exports.initialize = (app) => {
    // create socket.io server
    _socketPublisher = require('./socket-publisher.controller.js');
    _socketPublisher.initialize(app);
}

// create and save a new alarm-info
exports.create = (req, res) => {
    console.log('request = ' + JSON.stringify(req.body));

    // validate request
    if (!req.body) {
        return res.status(400).send({
            message: "alarm-info content can not be empty"
        });
    }

    // Create a new alarm-info object
    const alarm_info = new AlarmInfo(req.body);

    // Save alarm-info object in the database
    alarm_info.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the alarm-info."
            });
        });

    // send broadcast to all listener
    console.log('Publish new alarm-info to all listeners');
    _socketPublisher.sendMessage('alarm-info', JSON.stringify(alarm_info))
};

// Retrieve and return all alarm-infos from the database.
exports.findAll = (req, res) => {
    AlarmInfo.find()
        .then(alarms => {
            res.send(alarms);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving alarm-infos."
            });
        });
};

// Find a single alarm-info with a alarmId
exports.findOne = (req, res) => {
    AlarmInfo.findById(req.params.alarmId)
        .then(alarm_info => {
            if (!alarm_info) {
                return res.status(404).send({
                    message: "alarm-info not found with id " + req.params.alarmId
                });
            }
            res.send(alarm_info);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "alarm-info not found with id " + req.params.alarmId
                });
            }
            return res.status(500).send({
                message: "Error retrieving alarm-info with id " + req.params.alarmId
            });
        });
};

// Find a current alarm info in the last 15 minutes.
exports.findCurrentAlarmInfo = (req, res) => {

    console.log('>>> search...');

    const start = new Date();
    start.setMinutes(start.getMinutes() - 15);
    const end = new Date(2100, 11, 31);

    AlarmInfo.find({"time": {"$gte": start, "$lt": end}})
    .sort({time: 'desc'})
    .limit(1)
    .then(current_alarm => {
        console.log('found current alarm-info:\n%s', JSON.stringify(current_alarm));
        res.send(current_alarm);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the current alarm-info."
        });
    });
}

// Update a alarm-info identified by the alarmId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "alarm-info content can not be empty"
        });
    }

    // find alarm-info and update it with the request body
    AlarmInfo.findByIdAndUpdate(req.params.alarmId, {
            comment: req.body.title || "Untitled alarm-info",
            priority: 1 //req.body.content
        }, {
            new: true
        }) // "new: true" is used to return the modified document to the "then()" function instead of the original
        .then(alarm_info => {
            if (!alarm_info) {
                return res.status(404).send({
                    message: "alarm-info not found with id " + req.params.alarmId
                });
            }
            res.send(alarm_info);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "alarm-info not found with id " + req.params.alarmId
                });
            }
            return res.status(500).send({
                message: "Error updating alarm-info with id " + req.params.alarmId
            });
        });
};

// Delete a alarm-info with the specified alarmId in the request
exports.delete = (req, res) => {
    AlarmInfo.findByIdAndRemove(req.params.alarmId)
        .then(alarm_info => {
            if (!alarm_info) {
                return res.status(404).send({
                    message: "alarm-info not found with id " + req.params.alarmId
                });
            }
            res.send({
                message: "alarm-info deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "alarm-info not found with id " + req.params.alarmId
                });
            }
            return res.status(500).send({
                message: "Could not delete alarm-info with id " + req.params.alarmId
            });
        });
};
