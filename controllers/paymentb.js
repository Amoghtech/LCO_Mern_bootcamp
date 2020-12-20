const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "xwj6z3zr88hsdxvj",
  publicKey: "bd3955qwdttg67dg",
  privateKey: "9fc7244e9c231a87d69bd8d55f5906a2",
});

exports.getToken = () => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = () => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      //
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
