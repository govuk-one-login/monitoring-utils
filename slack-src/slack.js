const { getParameter } = require('./aws');

const handler = async function(event, context) { // eslint-disable-line no-unused-vars
    console.log("Alert lambda triggered");
    const slackHookUrl = process.env.SLACK_WEBHOOK_URL || await getParameter(process.env.DEPLOY_ENVIRONMENT+"-slack-hook-url");

    var config = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: event.Records[0].Sns.Message
    };
    console.log("Sending alert to slack");
    try {
        const response = await fetch(slackHookUrl, config);
        const json = await response.json();
        console.log(JSON.stringify(json));
    } catch (error) {
        console.log(error);
    }
};

module.exports = { handler };
