import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import EmptyWishlist from "../../components/EmptyWhislist/EmptyWhislist";  
import { message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';  

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = () => {
    try {
      const response = JSON.parse(localStorage.getItem('whislist')) || [];
      
      // Filter for unique items based on id
      const uniqueItems = response.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      );

      setWishlist(uniqueItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlistItem = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('whislist', JSON.stringify(updatedWishlist));
    message.success("Product removed from wishlist successfully");
  };

  return (
    <main className='text-center mt-4'>
      <Container> 
        <Link to="/shop" className="text-body">
          <FaLongArrowAltLeft className="me-2" />
          Continue shopping
        </Link>
        <hr />
        {wishlist.length > 0 ? (
          <Row>
            {wishlist.map((item, index) => (
              <Col xs={12} md={6} key={index} className="mb-3">  
                <div className="card">
                  <div className="card-body">
                    <div className="text-end mt-2 mt-md-0 mb-2"> 
                      <a className="text-muted" style={{ cursor: "pointer" }} onClick={() => removeWishlistItem(item.id)}>
                        <i className="fas fa-times"></i>
                      </a>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <img
                          src={item.image} 
                          className="img-fluid wishlist-img-top" // Ensures the image is responsive
                          alt={item.name} 
                        />
                        <h5 className="mt-2">{item.name}</h5>
                        <p className="small mb-0">
                          {item.description && typeof item.description === 'string'
                            ? item.description.substring(0, 120)
                            : "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <EmptyWishlist /> 
        )}
      </Container>
    </main>
  );
};

export default Wishlist;
