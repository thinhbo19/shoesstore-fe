"use client";

import { useEffect } from "react";

export default function InfomationUserPage() {
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
    }, 500);
  }, []);
  return;
}
