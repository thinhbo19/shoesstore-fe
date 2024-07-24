import { apiUrlOrder, apiUrlUser } from "@/services/config";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const style = { layout: "horizontal" };

const ButtonWrapper = ({
  showSpinner,
  currency,
  amount,
  payload,
  isEnabled,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  const accessToken = useSelector(selectAccessToken);
  const Swal = require("sweetalert2");
  const getCartData = () => {
    const cartData = localStorage.getItem("cartList");
    return cartData ? JSON.parse(cartData) : [];
  };
  const cartData = getCartData();

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const handleSaveOrder = async (payload) => {
    try {
      await axios.post(
        `${apiUrlOrder}/copy`,
        {
          ...payload,
          status: "Processing",
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      for (const product of cartData) {
        await axios.delete(
          `${apiUrlUser}/Cart/${product.product}/${product.size}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
      }
      Swal.fire({
        title: "BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG",
        icon: "success",
      });
      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
      router.push("/thong-tin/lich-su-mua-hang");
    } catch (error) {
      console.log(error);
    }
  };

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
                handleSaveOrder(payload);
              }
            })
          }
        />
      )}
    </>
  );
};

export default function Pay({ amount, payload, isElectronicEnabled }) {
  return (
    <div>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          isEnabled={isElectronicEnabled}
        />
      </PayPalScriptProvider>
    </div>
  );
}
