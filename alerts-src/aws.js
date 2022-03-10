const AWS = require("aws-sdk");

const SSM = new AWS.SSM();

const getParameter = async (parameterName) => {

  const result = await SSM.getParameter({
    Name: `${parameterName}`,
    WithDecryption: true,
  }).promise();

  return result.Parameter.Value;
};

module.exports = { getParameter };
