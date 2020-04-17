const dev = {
  defaultPassword: "Sp4DSezu2HhLctKvhaWFGwObvMhaLTji",
  apiGateway: {
    REGION: "eu-central-1",
    // URL: "https://8pqtao81vd.execute-api.eu-central-1.amazonaws.com/dev"
    URL: "https://dev.api.dobrastronka.pl/api/privatebin"
  },
};

const prod = {
  defaultPassword: "XYTZMHPV83ogYjthNijZwPFHqJJyQpug",
  apiGateway: {
    REGION: "eu-central-1",
    // URL: "https://8pqtao81vd.execute-api.eu-central-1.amazonaws.com/dev"
    URL: "https://dev.api.dobrastronka.pl/api/privatebin"
  },
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
