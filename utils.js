const request = require("request");

module.exports = {
  validateReCaptcha: function(req) {
    var response = {
      code: "0",
      description: "OK"
    };

    if (!req.body["g-recaptcha-response"]) {
      return (response = {
        code: "1",
        description: "Please, select captcha first"
      });
    }
    const secretKey = "6LfNHKMUAAAAAPwoR4vOv2lzy6azs801XroSn95S";
    const verificationURL =
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
      secretKey +
      "&response=" +
      req.body["g-recaptcha-response"] +
      "&remoteip=" +
      req.connection.remoteAddress;

    request(verificationURL, function(error, response, body) {
      body = JSON.parse(body);

      if (!body.success) {
        return (response = {
          code: "2",
          description: "Recaptcha verification failed"
        });
      }
    });
    return response;
  }
};
