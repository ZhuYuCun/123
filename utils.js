const resJson = function (data, code = '200', message = 'OK') {
  return {
    data,
    code,
    message,
  };
};

module.exports = {
  resJson,
};
