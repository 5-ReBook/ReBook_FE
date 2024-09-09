import React, { useEffect, useState } from 'react';
import './ChatHeader.css';
import AxiosInstance from '../../api/AxiosInstance';

function ChatHeader({ chatRoomId }) {
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
  const [usernameToShow, setUsernameToShow] = useState('');

  useEffect(() => {
    // 채팅방 정보 가져오기
    AxiosInstance.get(`/chat/rooms/${chatRoomId}`)
      .then(response => {
        AxiosInstance.get(`/products/${response.data.result.productId}`)
          .then(productResponse => {
            setProductInfo(productResponse.data.result);
          })
          .catch(error => {
            console.error('상품 정보를 가져오는 데 실패했습니다:', error);
          });
      })
      .catch(error => {
        console.error('채팅방 정보를 가져오는 데 실패했습니다:', error);
      });
  }, [chatRoomId]);

  useEffect(() => {
    // productInfo.sellerUsername이 업데이트된 후에만 실행
    if (productInfo.sellerUsername) {
      AxiosInstance.get(`/members/info/${productInfo.sellerUsername}`)
        .then(response => {
          setUsernameToShow(
            response.data.result.nickname == null
              ? productInfo.sellerUsername.split('@')[0]
              : response.data.result.nickname
          );
        })
        .catch(error => {
          console.error('판매자 정보를 가져오는 데 실패했습니다:', error);
        });
    }
  }, [productInfo.sellerUsername]);

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
      <div className="chat-seller-info">{usernameToShow}</div>
    </div>
  );
}

export default ChatHeader;
