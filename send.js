
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://fs:fs@10.29.101.67:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'phonemanagerJS';
        var msg = 'Olá mundo';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.bindQueue(queue, 'TAP.Events')

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
});
