
exports.handler = function (event, context, callback) {

    const conn = "pg://dev:sunmicrordssp1der@micrords.ckeww55ptuog.eu-west-1.rds.amazonaws.com:5432/mydb";

    const query = "select row_to_json(t) FROM (SELECT array_agg(roles.role) AS roles FROM roles WHERE userid=1) t";

    const { Client } = require('pg');

    const clientParams = {
        user: "dev",
        password: "sunmicrordssp1der",
        database: "mydb",
        port: 5432,
        host: "micrords.ckeww55ptuog.eu-west-1.rds.amazonaws.com"
    };
    const client = new Client(clientParams);

    client.connect()
        .then(() => {
            client.query(query)
                .then((res, err) => {
                    // console.log(JSON.stringify(res.rows[0].row_to_json));


                    const response = {
                        "statusCode": 200,
                        "headers": {
                            "content-type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": JSON.stringify(res.rows[0].row_to_json)
                    };

                    client.end();

                    callback(null, response)
                });
        }).catch(() => {
            callback(null, null)
        })
};