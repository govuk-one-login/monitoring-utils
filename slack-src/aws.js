const {
  SSM
} = require("@aws-sdk/client-ssm");

const client = new SSM();

const getParameter = async (parameterName) => {

  const result = await SSM.getParameter({
    Name: `${parameterName}`,
    WithDecryption: true,
  });

  return result.Parameter.Value;
};

module.exports = { getParameter };
