const axios = require('axios');
const { getParameter } = require("./aws");

const handler = async function(event, context) { // eslint-disable-line no-unused-vars
    console.log("Alert lambda triggered");
    const slackHookUrl = await getParameter(process.env.DEPLOY_ENVIRONMENT+"-slack-hook-url");
    var snsMessage = JSON.parse(event.Records[0].Sns.Message);

    function formatMessage(snsMessage) {
        if(JSON.stringify(snsMessage).includes("ElastiCache")) {
            return {
                "attachments": [{
                    "fallback": Object.keys(snsMessage)[0] + "for cluster: " + Object.values(snsMessage)[0],
                    "color": "#ff9966",
                    "title": Object.values(snsMessage)[0] + "-notification",
                    "text": Object.keys(snsMessage)[0] + " for cluster: " + Object.values(snsMessage)[0],
                    "fields": [{"title": "Status","value": "INFO","short": false}],
                    "footer": "GOV.UK Sign In alert"
                }]
            };
        } else {
            return {
                "attachments": [{
                    "fallback": snsMessage.AlarmDescription,
                    "color": snsMessage.NewStateValue === "OK" ? "#36a64f" : "#C70039",
                    "title": snsMessage.AlarmName,
                    "text": snsMessage.AlarmDescription,
                    "fields": [{"title": "Status", "value": snsMessage.NewStateValue, "short": false}],
                    "footer": "GOV.UK Sign In alert"
                }]
            };
        }
    }

    var config = {
        method: 'post',
        url: slackHookUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(formatMessage(snsMessage))
    };
    console.log("Sending alert to slack");
    try {
        const response = await axios(config);
        console.log(JSON.stringify(response.data));
    } catch (error) {
        console.log(error);
    }
};

module.exports = { handler }