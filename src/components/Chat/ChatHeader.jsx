import React, { useEffect, useState } from 'react';
import './ChatHeader.css';
import AxiosInstance from '../../api/AxiosInstance';

const ChatHeader = ({ chatRoomId }) => {
  const [productInfo, setProductInfo] = useState({
    bookMajor: '',
    bookUniversity: '',
    content: '',
    price: null,
    productId: null,
    sellerUsername: '',
    status: null,
    storeFileNameList: [],
    title: '',
  });

  useEffect(() => {
    console.log(chatRoomId);
    AxiosInstance.get(`/chat/rooms/${chatRoomId}`)
      .then(response => {
        console.log('RESSSSS : ', response.data);
        AxiosInstance.get(`/products/${response.data.result.productId}`)
          .then(productResponse => {
            console.log(productResponse.data.result);
            setProductInfo(productResponse.data.result);
          })
          .catch(error => {
            console.error('Failed to fetch product info:', error);
          });
      })
      .catch(error => {
        console.error('Failed to fetch chat room info:', error);
      });
  }, []);

  return (
    <div className="chat-header">
      <div className="product-info">
        <img
          src={`https://rb-dev-s3-images.s3.amazonaws.com/product/${productInfo.storeFileNameList[0]}`}
          alt="product"
          className="product-image"
        />
        <div className="chat-product-details">
          <div className="chat-product-title">{productInfo.title}</div>
          <div className="chat-product-price">
            {Number(productInfo.price).toLocaleString()}원
          </div>
        </div>
      </div>
      <div className="chat-seller-info">이서준</div>
    </div>
  );
};

export default ChatHeader;
