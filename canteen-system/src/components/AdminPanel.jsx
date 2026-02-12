import { useState, useEffect } from "react";

function AdminPanel() {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedMenu = JSON.parse(localStorage.getItem("menu") || "[]");
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setMenu(savedMenu);
    setOrders(savedOrders);
  }, []);

  const addItem = () => {
    if (!itemName || !itemPrice) return;
    const newMenu = [...menu, { name: itemName, price: parseFloat(itemPrice) }];
    setMenu(newMenu);
    localStorage.setItem("menu", JSON.stringify(newMenu));
    setItemName("");
    setItemPrice("");
  };

  const deleteItem = index => {
    const newMenu = menu.filter((_, i) => i !== index);
    setMenu(newMenu);
    localStorage.setItem("menu", JSON.stringify(newMenu));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  const markCompleted = index => {
    const newOrders = [...orders];
    newOrders[index].completed = true;
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const deleteOrder = index => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <button className="secondary" onClick={logout}>Logout</button>

      <h3>Add Menu Item</h3>
      <input placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} />
      <input placeholder="Price" value={itemPrice} onChange={e => setItemPrice(e.target.value)} />
      <button onClick={addItem}>Add</button>

      <h3>Menu Items</h3>
      {menu.map((m, i) => (
        <div key={i} className="menu-item">
          {m.name} - Rs {m.price}
          <button className="secondary" onClick={() => deleteItem(i)}>Delete</button>
        </div>
      ))}

      <h3>Customer Orders</h3>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.slice().reverse().map((order, i) => (
        <div
          key={i}
          className="menu-item"
          style={{ backgroundColor: order.completed ? "#181717" : "#181717" }}
        >
          <div>
            <strong>User:</strong> {order.user} <br />
            <strong>Items:</strong> {order.items.map(it => it.name).join(", ")} <br />
            <strong>Total:</strong> Rs {order.items.reduce((sum, it) => sum + it.price, 0)}
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            {!order.completed && (
              <button className="secondary" onClick={() => markCompleted(orders.length - 1 - i)}>
                Mark Completed
              </button>
            )}
            {order.completed && (
              <button className="secondary" onClick={() => deleteOrder(orders.length - 1 - i)}>
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
