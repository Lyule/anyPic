const request = require('request');

module.exports = (opts) => {
  const { method = 'GET', encoding = 'utf8', url} = opts;
  return new Promise((resolve, reject) => {
    request({
      method,
      encoding,
      url
    }, function(err, response, body) {
      if (err) {
        return reject(err)
      }
      resolve(body)
    })
  })
}
