# Digital Identity Monitoring Utilities

This repo contains shared code used by smoke tests and other monitoring tools across the digital identity product space.

## Alerts Lambda

The alerts lambda is used to send alerts via Slack. It reads messages from an SNS topic, formats them appropriately and calls a, configurable, Slack webhook.

This lambda is in the `alerts-src/` directory.

## Heartbeat Lambda

The heartbeat lambda is used to send a Cronitor heartbeat to a, configurable, Cronitor monitor key. Typically, this would be triggered by a Cloudwatch event trigger on completion of a given smoke test.

This lambda is in the `heartbeat-src/` directory.

## Slack Lambda

As alerts lambda, but writes the raw message from SNS to the Slack webhook. No mutation or checking is done in the Lambda function, the message is sent as-is.

This lambda is in the `slack-src/` directory.
