const axios = require('axios');
const { getParameter } = require("./aws");

const handler = async function(event, context) { // eslint-disable-line no-unused-vars
    console.log("Alert lambda triggered");
    const slackHookUrl = process.env.SLACK_WEBHOOK_URL || await getParameter(process.env.DEPLOY_ENVIRONMENT+"-slack-hook-url");

    var config = {
        method: 'post',
        url: slackHookUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data : event.Records[0].Sns.Message
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