import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";
const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
      return amount;
    });
    return amount;
  };

  const makePayment = (token) => {
    console.log("MAKE PAYMENT");
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    console.log("body", body);
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("In Response ");
        console.log(response);
        //! CREATE FURTHER METHODS..
        const { status } = response;
        console.log("Status", status);
        cartEmpty();
      })
      .catch((err) => console.log("ERROR:: >>>>>>", err));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51HFjpKIFpVx1LutXbMGdNZVIkcewenUXhCqc3I4aJQGvZlqg2XKVgGqK5UZWhTmgP1O5jXovuryLwpnoTAN1skFb00BUxRXiLe"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy T-shirt"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with strpe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn-btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
