  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { FaLongArrowAltLeft } from "react-icons/fa"; 
  import { message, Modal, Form, Input, Button, notification } from "antd";
  import { addDoc, collection } from "firebase/firestore"; 
  import { getAuth } from "firebase/auth";  
  import EmptyCart from "../../components/EmptyCart/EmptyCart";
  import { db } from "../../firebase/config"; 

  const initialState = { cardName: "", cardNumber: "", expiration: "", cvv: "" };

  const Cart = () => {
    const navigate = useNavigate();
    const auth = getAuth();  
    const currentUser = auth.currentUser;  
    const [input, setInput] = useState(initialState);
    const [cart, setCart] = useState([]);
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState({ cartItems: [], total: 0 });

    console.log(cart)

    const fetchProducts = () => {
      try {
        const response = JSON.parse(localStorage.getItem("cart")) || [];
        const groupedCart = response.reduce((acc, item) => {
          const existingItem = acc.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.quantity += item.quantity || 1;
          } else {
            acc.push({ ...item, quantity: item.quantity || 1 });
          }
          return acc;
        }, []);
        setCart(groupedCart);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    const removeCartItem = (id) => {
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      message.success("Product removed from cart successfully");
    };

    const updateQuantity = (id, newQuantity) => {
      const updatedCart = cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      message.success("Quantity updated successfully");
    };

    const handleOrderModalOpen = () => {
      if (!currentUser) {
        message.error("You must be logged in to place an order.");
        return;
      } 

      setOrderDetails({
        cartItems: [...cart],
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });
      setIsOrderModalVisible(true);
    };

    const handleOrder = async (values) => {
      if (!currentUser) {
        notification.error({
          message: 'Error',
          description: 'You must be logged in to place an order.',
        });
        return;
      }

      try {
        const batchOrders = orderDetails.cartItems.map(async (item) => {
          if (!item.sellerEmail) {
            item.sellerEmail = '';
          }

          await addDoc(collection(db, 'orders'), {
            ...item,
            buyerId: currentUser.uid,
            buyerEmail: currentUser.email,
            sellerEmail: item.sellerEmail,
            productName: item.name,
            productPrice: item.price,
            productImage: item.image,
            ...values,
            timestamp: new Date(),
          });
        });

        await Promise.all(batchOrders);

        notification.success({
          message: 'Order Placed',
          description: 'Your order has been placed successfully.',
        });

        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
        setIsOrderModalVisible(false);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: `Error placing order: ${error.message}`,
        });
      }
    };

    return (
      <main>
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-lg-7">
                        <h5 className="mb-3">
                          <Link to="/shop" className="text-body">
                            <FaLongArrowAltLeft className="me-2" />
                            Continue shopping
                          </Link>
                        </h5>
                        <hr /> 
                        {cart.length >= 1
                          ? cart.map((item, index) => (
                              <div className="card mb-3" key={index}>
                                <div className="card-body">
                                <div className="text-end">
                                  <a className="text-muted" style={{ cursor: "pointer" }}>
                                    <i className="fas fa-times" onClick={() => removeCartItem(item.id)}></i>
                                  </a>
                              </div>
                                  <div className="d-flex justify-content-between p-3 flex-wrap">
                                    <div className="d-flex flex-row align-items-center">
                                      <div>
                                        <img
                                          src={item.image} 
                                          className="card-img-top"
                                          alt={item.name}
                                        />
                                      </div>
                                      <div className="title-and-description mt-2">
                                        <h5>{item.name}</h5>
                                        <p className="small mb-2">
                                          {item.description && typeof item.description === 'string'
                                            ? item.description.substring(0, 120)
                                            : "No description available"}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                                      <div style={{ width: "50px", marginRight: "20px" }}>
                                        <input
                                          type="text"
                                          value={item.quantity || 1}
                                          min="1"
                                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                          className="form-control"
                                        />
                                      </div>
                                      <div style={{ width: "80px" }}>
                                        <h5 className="mb-0">${item.price}</h5>
                                      </div> 
                                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <a className="text-muted" style={{cursor:"pointer"}}> 
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : <EmptyCart/>}
                      </div>
                      
                    <div className="col p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">items {cart.length}</h5>
                          <h5>
                            ${" "}
                            {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                          </h5>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">total</h5>
                          <h5>
                            ${" "}
                            {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                          </h5>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-danger btn-block" disabled={cart.length===0} onClick={handleOrderModalOpen}>
                            Checkout
                          </button> 
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal
          title="Order"
          visible={isOrderModalVisible}
          onCancel={() => setIsOrderModalVisible(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleOrder}>
            <Form.Item
              label="Name on Card"
              name="cardName"
              rules={[{ required: true, message: "Please input your name on the card!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[{ required: true, message: "Please input your card number!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Expiration Date"
              name="expiration"
              rules={[{ required: true, message: "Please input your card's expiration date!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="CVV"
              name="cvv"
              rules={[{ required: true, message: "Please input your card's CVV!" }]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Place Order
            </Button>
          </Form>
        </Modal>
      </main>
    );
  };

  export default Cart;



