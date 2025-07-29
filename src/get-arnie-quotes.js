const { httpGet } = require('./mock-http-interface');

const parseResponse = (response) => {
  const { status, body } = response;
  const { message } = JSON.parse(body);

  if (status === 200) {
    return { 'Arnie Quote': message };
  } else {
    return { FAILURE: message };
  }
};

const getArnieQuotes = async (urls) => {
  const httpPromises = urls.map(url => httpGet(url));

  const settledPromisesResult = await Promise.allSettled(httpPromises);
  
  const arnieQuotes = settledPromisesResult.map(result => {
    if (result.status === 'fulfilled') {
      return parseResponse(result.value);
    } else {
      return { FAILURE: 'Request failed' };
    }
  });

  return arnieQuotes;
};

module.exports = {
  getArnieQuotes,
};
