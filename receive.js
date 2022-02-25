var amqp = require('amqplib/callback_api');
fs = require('fs');

amqp.connect('amqp://fs:fs@10.29.101.67:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'phonemanagerJS';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            var retorno = msg.content.toString()
            var json = JSON.parse(retorno)
            console.log(json)

            // fs.appendFile('test.txt', msg.content.toString(), function (err) {
            //     if (err) throw err;
            // });
        }, {
            noAck: true
        });
    });
});
