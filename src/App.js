
import axios from "axios";
import { useState } from 'react';
import './App.css';

function App() {
  const [book]=useState({
    name:"The fault in our Stars!",
    author:"John Green",
    img:"https://images.unsplash.com/photo-1662556427517-13150f5cbb58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    price:1,
  });
  
  const initPayment=(data)=>{
    const options={
      key:"rzp_test_OohyA6lHxkfvcc",
      amount:data.amount,
      currency:data.currency,
      name:book.name,
      description:"test payment",
      image:book.img,
      order_id:data.id,
      handler:async(response)=>{
        try {
          const verifyUrl="https://52.41.36.82:8000/api/payment/verify";
          const {data}= await axios.post(verifyUrl,response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme:{
        color:"#3399cc",
      },
    };
    console.log("this");
    const rzp1=new window.Razorpay(options);
    rzp1.open();
  };
  
  const handlePayment= async()=>{
    try {
      const orderUrl="https://52.41.36.82:8000/api/payment/orders";
      const {data}= await axios.post(orderUrl,{amount:book.price});
      console.log(data);
      initPayment(data.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
     <div className="book_container">
        <img src={book.img} alt="book_img" className="book_img" />
        <p className="book_name">{book.name}</p>
        <p className="book_author">By {book.author}</p>
        <p className="book_price">
          Price: <span>&#x20B9;{book.price}</span>
        </p>
        <button onClick={handlePayment} className="buy_btn">Buy Now</button>
      </div> 
    </div>
  );
}

export default App;
