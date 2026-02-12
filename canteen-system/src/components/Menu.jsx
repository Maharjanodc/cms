import { useState, useEffect } from "react";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedMenu = JSON.parse(localStorage.getItem("menu") || "[]");
    setMenuItems(savedMenu);
  }, []);

  const addToCart = item => setCart([...cart, item]);

  const placeOrder = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    orders.push({ user: loggedInUser.username, items: cart });
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order placed!");
    setCart([]);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };


  return (
    
    <div className="container">
      
      <h2>Menu</h2>
      <button className="secondary" onClick={logout}>Logout</button>

      <h3>Items</h3>
      {menuItems.map((item, i) => (
        <div key={i} className="menu-item">
          {item.name} - Rs {item.price}
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map((item, i) => (
        <div key={i} className="cart-item">
          {item.name} - Rs {item.price}
        </div>
      ))}

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

<div class="video-container">
        <video loop autoplay muted id="background-video">
            <source src="background.mp4" type="video/mp4"> </source>
        </video>
    </div>



export default Menu;
