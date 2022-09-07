module.exports = {
  name: "CoolApp",
  version: "1.0.0",
  extra: {
    enableComments: process.env.COOLAPP_COMMENTS === "true",
    // apiEndpoint: process.env.REACT_APP_API_ENDPOINT,
  },
};
