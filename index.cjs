const axios = require('axios');

exports.handler = async (event) => {
    if (!event.Records || event.Records.length === 0) {
        console.log("No records found");
        return;
    }

    for (const record of event.Records) {
        try {
            const messageBody = JSON.parse(record.body);
            const idSqs = messageBody.id;

            if (!idSqs) {
                console.log("Attribute not found in message body");
                continue;
            }

            const response = await axios.post('http://ad1b7891a07a84b3aae6d178d1cc98db-1751645578.us-east-1.elb.amazonaws.com:8083/pedidos', {
                id: idSqs
            });

            console.log(`Status Code: ${response.status}`);
            console.log(`Response Data: ${JSON.stringify(response.data)}`);
        } catch (error) {
            console.error(`Error processing record: ${error}`);
        }
    }
};
