import { mqttServerUrl } from '../config/mqtt.config.js';
var amqp = require('amqplib/callback_api');


module.exports = function(exchangeKey, message) {

    console.log('[AMQP] connect to mqttServerUrl ...');

    amqp.connect(mqttServerUrl, function (err, conn) {
        console.log('[AMQP] connected');

        conn.createChannel(function (err, ch) {
            console.log('[AMQP] create channel');
            ch.assertExchange(exchangeKey, 'fanout', { durable: false });

            console.log('[AMQP] publish message');
            ch.publish(exchangeKey, 'ffw', Buffer.from(message));
        });

        setTimeout(function () {
            console.log('[AMQP] Closing connection');
            conn.close();
        }, 500);
    });
}
