import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function useOrderFetch() {
  const [order, setOrder] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/orders", {
      method: "GET",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        setOrder(orders.order);
        setMessage(orders.message);
      });
  }, []);
  return [order, message];
}



export { useOrderFetch,  };
