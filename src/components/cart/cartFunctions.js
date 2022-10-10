
import Cookies from "js-cookie";
import { getCart } from "../../features/cart/cartSlice";

export const placeOrder = (total,total_amount,tax,delivery_charges,delivery_address,dispatch) => {
   
    const data = new FormData();
    data.append("order[total_amount]", total);
    data.append("order[tax]", tax);
    data.append("order[total_to_pay]", total_amount);
    data.append("order[delivery_charges]", delivery_charges);
    data.append("order[delivery_address]", delivery_address);
    
    data.append("order[status]", "active");

    fetch("http://127.0.0.1:3000/api/orders", {
      method: "POST",
      headers: {
        Authorization: JSON.parse(Cookies.get("user")).authorization,
      },
      body: data
    })
      .then((response) => response.json())
      .then((order) => {
        window.alert(order.message);
        if(order.message === "order placed"){
          dispatch(getCart())
        }
      });
}