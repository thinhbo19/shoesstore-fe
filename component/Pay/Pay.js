import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect } from "react";

const style = { layout: "horizontal" };

const ButtonWrapper = ({
  showSpinner,
  amount,
  isEnabled,
  paymentSuccess,
  currency,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      {isEnabled && (
        <PayPalButtons
          style={style}
          forceReRender={[style, currency, amount]}
          fundingSource={undefined}
          createOrder={(data, actions) =>
            actions.order
              .create({
                purchase_units: [
                  { amount: { currency_code: currency, value: amount } },
                ],
              })
              .then((orderId) => orderId)
          }
          onApprove={(data, actions) =>
            actions.order.capture().then(async (response) => {
              if (response.status === "COMPLETED") {
                paymentSuccess();
              }
            })
          }
        />
      )}
    </>
  );
};

export default function Pay({
  amount,
  isElectronicEnabled,
  paymentSuccess,
  currency,
}) {
  return (
    <div>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          currency={currency}
          amount={amount}
          showSpinner={false}
          isEnabled={isElectronicEnabled}
          paymentSuccess={paymentSuccess}
        />
      </PayPalScriptProvider>
    </div>
  );
}
